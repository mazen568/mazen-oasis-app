import { getBookedDatesByCabinId,getCabin } from "@/lib/data-service";

export async function GET(request: Request, { params }: { params: Promise<{ cabinId: number }>; }) {
    const { cabinId } = await params;
    // console.log(cabinId);
    // console.log(request.url);
try {
    const [cabin,bookings]= await Promise.all([getCabin(cabinId),getBookedDatesByCabinId(cabinId)]);
    return Response.json({
        cabin,
        bookings
    })
} catch {
    return Response.json({
        errorMessage:"can not fetch the cabin and it is bookings"
    })
}
    return Response.json({
        test: "test"
    });

}