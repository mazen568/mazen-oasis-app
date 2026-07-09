import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/lib/data-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProductPageProps {
    params: Promise<{ cabinId: string }>
}

// export const metadata: Metadata={
//     title :"Cabin"
// }

export async function generateMetadata({ params }: ProductPageProps) {
    const { cabinId } = await params;
    const cabin = await getCabin(Number(cabinId));

    if (!cabin) {
        return {
            title: "Cabin Not Found",
        };
    }
    return {
        title: `Cabin ${cabin.name}`
    }
}

export async function generateStaticParams() {
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));
    return ids;
}
export default async function page({ params }: ProductPageProps) {
    const { cabinId } = await params;
    const cabin = await getCabin(Number(cabinId));

    if (!cabin)
        notFound();


    return (
        <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
            <Cabin cabin={cabin} />

            <div className="mt-16">
                <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    )
}
