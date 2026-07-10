/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation';
import { Booking } from '@/lib/types'
import { getCabin } from '@/lib/data-service';
import Link from 'next/link';

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

interface ReservationCardProps {
  booking: Booking;
}

async function ReservationCard({ booking }: ReservationCardProps) {
  const {
    id,
    guest_id: guestId,
    start_date: startDate,
    end_date: endDate,
    number_nights: numNights,
    total_price: totalPrice,
    number_guests: numGuests,
    status,
    created_at,
    cabin_id

  } = booking;

  if (!cabin_id) {
    throw new Error("Cabin ID is required");
  }

  const cabin = await getCabin(cabin_id);

  if (!cabin) {
    throw new Error("Cabin not found");
  }

  const { image, name } = cabin;
  const isPastReservation = startDate ? isPast(new Date(startDate)) : false;

  return (
    <div className='flex border border-primary-800'>
      <div className='relative h-32 aspect-square'>
        <img
          src={image??""}
          alt={`Cabin ${name}`}
          className='object-cover border-r border-primary-800'
        />
      </div>

      <div className='flex-grow px-6 py-3 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>
            {numNights} nights in Cabin {name}
          </h3>
          {isPastReservation ? (
            <span className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              past
            </span>
          ) : (
            <span className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              upcoming
            </span>
          )}
        </div>

        <p className='text-lg text-primary-300'>
          {startDate ? format(new Date(startDate), 'EEE, MMM dd yyyy') : 'Invalid date'} (
          {startDate && isToday(new Date(startDate))
            ? 'Today'
            : startDate ? formatDistanceFromNow(startDate) : 'Invalid date'}
          ) &mdash; {endDate ? format(new Date(endDate), 'EEE, MMM dd yyyy') : 'Invalid date'}
        </p>

        <div className='flex gap-5 mt-auto items-baseline'>
          <p className='text-xl font-semibold text-accent-400'>${totalPrice}</p>
          <p className='text-primary-300'>&bull;</p>
          <p className='text-lg text-primary-300'>
            {numGuests ?? 0} guest{(numGuests ?? 0) > 1 && 's'}
          </p>
          <p className='ml-auto text-sm text-primary-400'>
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      {!isPastReservation && (
        <div className='flex flex-col border-l border-primary-800 w-[100px]'>
          <Link
            href={`/account/reservations/edit/${id}`}
            className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
          >
            <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
            <span className='mt-1'>Edit</span>
          </Link>
          <DeleteReservation bookingId={id} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;
