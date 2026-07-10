'use server'


import { auth, signIn, signOut } from "@/lib/auth"
import { revalidatePath } from "next/cache";
import { updateGuest } from "./data-service";

export async function updateGuestProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id)
        throw new Error("You must be logged in to update your profile");

    const nationalID = formData.get("nationalID") as string;
    const nationalityValue = formData.get("nationality") as string;
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

export async function signInAction() {
    await signIn('google', { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/login" });
}
