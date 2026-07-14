'use client';
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { Booking } from "@/lib/types";
import { deleteReservation } from "@/lib/actions";
interface ReservationListProps{
    bookings:Booking[];
}
export default  function ReservationList({bookings}:ReservationListProps) {
    

    const [optimisticBookings,optimisticDelete]=useOptimistic(bookings,(currentBookings,bookingId)=>{
      return currentBookings.filter(curr=>curr.id!==bookingId)
    });


    async function handleDelete(bookingId:number){
        optimisticDelete(bookingId);
        await deleteReservation(bookingId);
    }


    return (
        <>
            {optimisticBookings.length === 0 ? (
                <p className="text-lg">
                    You have no reservations yet. Check out our{" "}
                    <a className="underline text-accent-500" href="/cabins">
                        luxury cabins &rarr;
                    </a>
                </p>
            ) : (
                <ul className="space-y-6">
                    {bookings.map((booking) => (
                        <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
                    ))}
                </ul>
            )}</>
    )
}
