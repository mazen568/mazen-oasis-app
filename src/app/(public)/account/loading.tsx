import Spinner from "@/components/Spinner"
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
    <Spinner />
    <p>Loading Guest Area....</p>
    </div>
  )
}
