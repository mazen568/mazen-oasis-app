'use server'


import { auth, signIn, signOut } from "@/lib/auth"
import { revalidatePath } from "next/cache";
import { deleteBooking, getBooking, updateGuest } from "./data-service";

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

export async function deleteReservation(bookingId: number) {
    const session = await auth();
    if (!session?.user?.id)
        throw new Error("You must be logged in to delete a reservation");

    const booking = await getBooking(bookingId);

    if (booking.guest_id !== Number(session.user.id))
        throw new Error("You are not allowed to delete this reservation");
    //copy curl from the browser and paste it into the cmd(without this if check anyone will be able to delete this reservation not just the reservation owner)

    await deleteBooking(bookingId);


    revalidatePath("/account/reservations");
}

export async function signInAction() {
    await signIn('google', { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/login" });
}
