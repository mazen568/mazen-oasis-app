'use client';

import { updateGuestProfile } from "@/lib/actions";
import { Guest } from "@/lib/types";
import Image from "next/image";

// import Image from "next/image";
interface UpdateProfileFormProps {
    children: React.ReactNode;
    guest: Guest
}
export default function UpdateProfileForm({ children, guest }: UpdateProfileFormProps) {
    // const countryFlag = "pt.jpg";

    return <form action={updateGuestProfile} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
            <label>Full name</label>
            <input
                disabled
                className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                name="fullName"
                defaultValue={guest.full_name ?? ""}

            />
        </div>

        <div className="space-y-2">
            <label>Email address</label>
            <input
                disabled
                className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                name="email"
                defaultValue={guest.email ?? ""}

            />
        </div>

        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="nationality">Where are you from?</label>
                <div className="relative h-5 aspect-square">
                    <Image
                        src={guest.country_flag ?? ""}
                        alt="Country flag"
                        className="rounded-sm object-cover"
                        fill
                    />
                </div>
            </div>

            {children}
        </div>

        <div className="space-y-2">
            <label htmlFor="nationalID">National ID number</label>
            <input
                name="nationalID"
                className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                defaultValue={guest.national_id??""}
            />
        </div>

        <div className="flex justify-end items-center gap-6">
            <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
                Update profile
            </button>
        </div>
    </form>
}