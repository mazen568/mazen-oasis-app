import { getCabins } from "@/lib/data-service"
import CabinCard from "./CabinCard";
interface CabinListProps {
    capacity: string
}
export default async function CabinList({ capacity }: CabinListProps) {
    

    const cabins = await getCabins();
    let filteredCabins;
    if (capacity === "all")
        filteredCabins = cabins;
    else if (capacity === "small")
        filteredCabins = cabins.filter(cabin => (cabin.max_capacity ?? 0) <= 2);
    else if (capacity === "medium")
        filteredCabins = cabins.filter(cabin => (cabin.max_capacity ?? 0) >= 3 && (cabin.max_capacity ?? 0) <= 4);
    else if (capacity === "large")
        filteredCabins = cabins.filter(cabin => (cabin.max_capacity ?? 0) >= 5);


    return (
        <>
            {cabins.length > 0 && (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
                    {filteredCabins?.map((cabin) => (
                        <CabinCard cabin={cabin} key={cabin.id} />
                    ))}
                </div>
            )}
        </>
    );
}
