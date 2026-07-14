import { auth } from "@/lib/auth";
import ReservationCard from "./ReservationCard";
import { getBookings } from "@/lib/data-service";
export default async function ReservationList() {
    const session = await auth();

    if (!session?.user?.id)
        throw new Error("Not authenticated");
    const bookings = await getBookings(Number(session?.user?.id));

    console.log("hello");
    

    return (
        <>
            {bookings.length === 0 ? (
                <p className="text-lg">
                    You have no reservations yet. Check out our{" "}
                    <a className="underline text-accent-500" href="/cabins">
                        luxury cabins &rarr;
                    </a>
                </p>
            ) : (
                <ul className="space-y-6">
                    {bookings.map((booking) => (
                        <ReservationCard booking={booking} key={booking.id} />
                    ))}
                </ul>
            )}</>
    )
}
