import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import type { Cabin } from "@/lib/types";

interface ReservationProps {
    cabin: Cabin;
}

export default async function Reservation({cabin}: ReservationProps) {

    const [settings,bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id)
    ])

  return (
    <div className="mt-10 grid min-h-[420px] overflow-hidden  border border-primary-800  lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.85fr)]">
      <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
      <ReservationForm cabin={cabin} />
    </div>
  )
}
