/* eslint-disable @next/next/no-img-element */
import SelectCountry from "@/components/SelectCountry";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";
import { getGuest } from "@/lib/data-service";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
    //caught by the nearest error.ts file
  }
  const guest = await getGuest(session?.user?.email)
  console.log(guest);
  

  if (!guest) {
    throw new Error("Guest not found");
     //caught by the nearest error.ts file
  }


  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality ?? ""}
        />
      </UpdateProfileForm>
    </div>
  );
}
