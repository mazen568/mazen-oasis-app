'use server'

import { auth, signIn, signOut } from "@/lib/auth"
import { revalidatePath } from "next/cache";
import { createBooking, deleteBooking, getBooking, updateBooking, updateGuest } from "./data-service";
import { redirect } from "next/navigation";
import { BookingData } from "./types";


export async function updateGuestProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id)
        throw new Error("You must be logged in to update your profile");

    const nationalID = String(formData.get("nationalID"));
    const nationalityValue = String(formData.get("nationality"));
    const [nationality, countryFlag] = nationalityValue.split("%");

    const regex = /^[a-zA-Z0-9]{6,12}$/;
    if (!regex.test(nationalID))
        throw new Error("Invalid national ID number");

    const newData = {
        national_id: nationalID,
        nationality,
        country_flag: countryFlag
    }

    await updateGuest(Number(session.user.id), newData);

    revalidatePath("/account/profile");
}

export async function createReservation(bookingData: BookingData,formData:FormData){
    const session = await auth();
    if (!session?.user?.id)
        throw new Error("You must be logged in to create a reservation");
    
    const numGuests= Number(formData.get("numGuests"));
    const observations = String(formData.get("observations"));


    const newReservation= {
        ...bookingData,
        guest_id: Number(session.user.id),
        number_guests:numGuests,
        observations,
        extras_price:0,
        total_price:bookingData.cabin_price,
        is_paid:false,
        has_breakfast:false,
        status:"unconfirmed"
    }

    await createBooking(newReservation);

    revalidatePath(`/cabins/${bookingData.cabin_id}`);
    redirect("/cabins/thankyou")

   

}

export async function deleteReservation(bookingId: number) {
    const session = await auth();
    if (!session?.user?.id)
        throw new Error("You must be logged in to delete a reservation");

    const booking = await getBooking(bookingId);

    if (booking?.guest_id !== Number(session.user.id))
        throw new Error("You are not allowed to delete this reservation");
    //copy curl from the browser and paste it into the cmd(without this if check anyone will be able to delete this reservation not just the reservation owner)

    await deleteBooking(bookingId);


    revalidatePath("/account/reservations");
}


export async function updateReservation(formData: FormData) {
    console.log(formData);

    const session = await auth();
    if (!session?.user?.id)
        throw new Error("You must be logged in to update a reservation");

    const reservationId = Number(formData.get("reservationId"));
    const observations = String(formData.get("observations") );
    const numOfGuests = Number(formData.get("numGuests"));
    const booking = await getBooking(reservationId);

    if (booking?.guest_id !== Number(session.user.id))
        throw new Error("You are not allowed to update this reservation");

    const newReservationData={
       observations,
       number_guests:numOfGuests
    }

    await updateBooking(reservationId,newReservationData);
    

    revalidatePath(`/account/reservations/edit/${reservationId}`);
    revalidatePath("/account/reservations");
    redirect("/account/reservations");




}
export async function signInAction() {
    await signIn('google', { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/login" });
}
