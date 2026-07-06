'use client';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { URLSearchParams } from "url";


export default function Filter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    // console.log(pathname);
    // console.log(searchParams.get("capacity"));





    function handleFilter(filter: string) {
        const params = new URLSearchParams(searchParams);
        // console.log(params.toString());
        params.set("capacity", filter);
        
        router.replace(`${pathname}?${params.toString()}`,{scroll:false});

    }
    return (
        <div className="border border-primary-800">
            <Button onClick={() => handleFilter("all")}>All cabins</Button>
            <Button onClick={() => handleFilter("small")}>2 guests</Button>
            <Button onClick={() => handleFilter("medium")}>4 guests</Button>
            <Button onClick={() => handleFilter("large")}>5+ guests</Button>


        </div>
    )
}

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
    return <>
        <button onClick={onClick} className="px-5 py-2 hover:bg-primary-700">{children}</button>
    </>
}
