import ReservationList from "@/components/ReservationList";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
export default async function Page() {


  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

     {/* reservation list */}
     <Suspense fallback={<div className="flex flex-col items-center">
      <Spinner/>
      <p>Loading Reservations....</p>
     </div>}>
      <ReservationList/>
     </Suspense>
    </div>
  );
}