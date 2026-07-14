'use client';
import { BookingData, Cabin } from "@/lib/types";
import { useReservation } from "./ReservationContext";
import Image from "next/image";
import { Session } from "next-auth";
import { differenceInDays } from "date-fns";
import { createReservation } from "@/lib/actions";
import SubmitButton from "./SubmitButton";

interface ReservationFormProps {
  cabin: Cabin,
  user: Session["user"]
}
function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { max_capacity: maxCapacity, regular_price: regularPrice, discount } = cabin;
  const { range, resetRange } = useReservation();

  const startDate = range?.from;
  const endDate = range?.to;
  const numNights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * ((regularPrice ?? 0) - (discount ?? 0));

  const bookingData: BookingData = {
    start_date: startDate?.toISOString(),
    end_date: endDate?.toISOString(),
    cabin_id: cabin.id,
    number_nights: numNights,
    cabin_price: cabinPrice
  }


  const createReservationAction = createReservation.bind(null, bookingData)


  return (
    <div className='h-full'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <div className="relative aspect-square h-8">
            <Image
              referrerPolicy='no-referrer'
              className='rounded-full object-cover'
              src={user?.image ?? ""}
              alt={user?.name ?? ""}
              fill

            />
          </div>
          <p>{user?.name}</p>
        </div>
      </div>

      {range?.from && <p className="flex flex-col gap-2 px-16 py-4 text-primary-300 text-lg">
        <span> {range?.from?.toDateString()} </span>
        <span>
          to
        </span>
        <span>
          {range?.to?.toDateString()}
        </span>
      </p>}

      <form action={(formData) => {
        createReservationAction(formData);
        resetRange();
      }} className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity ?? 0 }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          <p className='text-primary-300 text-base'>Start by selecting dates</p>
          <SubmitButton pendingLabel="Reserving...">Reserve Now</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
