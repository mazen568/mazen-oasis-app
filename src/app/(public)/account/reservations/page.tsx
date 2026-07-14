import ReservationList from "@/components/ReservationList";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";
export default async function Page() {
  const session = await auth();

  if (!session?.user?.id)
    throw new Error("Not authenticated");
  const bookings = await getBookings(Number(session?.user?.id));

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>
      <ReservationList bookings={bookings}/>
    </div>
  );
}