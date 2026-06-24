import Spinner from "@/components/Spinner"
export default function Loading() {
  return (
    <div className="grid items-center justify-center">
    <Spinner/>
    <p>Loading Cabins...</p>
    </div>
  )
}
