import { Metadata } from "next";
import CabinList from "@/components/CabinList";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import Filter from "@/components/Filter";
import ReservationReminder from "@/components/ReservationReminder";


// export const revalidate =0;// revalidate every 0 seconds, meaning no caching, always fetch fresh data(render this page dynamically on every request)
export const revalidate = 3600; // revalidate every 3600 seconds, meaning cache this page(data because full route cache is revalidated when data cache is revalidated) for 3600 seconds, then fetch fresh data
export const metadata: Metadata = {
    title: "Cabins"
}


interface props {
    searchParams: Promise<{ capacity: string }>
}
export default async function page({ searchParams }: props) {

    let { capacity } = await searchParams;
    capacity = capacity ?? "all";
    console.log("capacity: ",capacity)
    return (
        <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 text-lg mb-10">
                Cozy yet luxurious cabins, located right in the heart of the Italian
                Dolomites. Imagine waking up to beautiful mountain views, spending your
                days exploring the dark forests around, or just relaxing in your private
                hot tub under the stars. Enjoy nature&rsquo;s beauty in your own little home
                away from home. The perfect spot for a peaceful, calm vacation. Welcome
                to paradise.
            </p>
            <div className="mb-5 flex justify-end">
                <Filter />
            </div>
            <Suspense fallback={<Spinner />}>
                <CabinList capacity={capacity}/>
                <ReservationReminder />
            </Suspense>
        </div>
    );
}
