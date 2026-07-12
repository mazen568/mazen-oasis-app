import SubmitButton from "@/components/SubmitButton";
import { updateReservation } from "@/lib/actions";
import { getBooking, getCabin } from "@/lib/data-service";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { reservationId: string } }) {
  const { reservationId } = params;

  const booking = await getBooking(Number(reservationId));

  return {
    title: `Reservation ${booking.id}`
  }

}

export default async function Page({ params }: { params: { reservationId: string } }) {
  const { reservationId } = params;
  const booking = await getBooking(Number(reservationId));
  console.log(booking);
  

  if (!booking)
    notFound();

  if (!booking.cabin_id)
    throw new Error("Booking has no cabin");

  const cabin = await getCabin(booking.cabin_id);

  if (!cabin)
    throw new Error("Cabin does not exit")

  const { max_capacity } = cabin;
  


  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form action={updateReservation} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <input type="hidden" value={reservationId} name="reservationId" />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={booking.number_guests ?? 0}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: max_capacity ?? 0 }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={booking.observations ?? ""}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

