'use client';
import { Cabin } from "@/lib/types";
import { useReservation } from "./ReservationContext";
import Image from "next/image";
import { Session } from "next-auth";

interface ReservationFormProps {
  cabin: Cabin,
  user: Session["user"]
}
function ReservationForm({ cabin,user }: ReservationFormProps) {
  const { max_capacity: maxCapacity } = cabin;
  const { range } = useReservation();
  

  return (
    <div className='scale-[1.01]'>
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

      <form className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
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

          <button className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'>
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;