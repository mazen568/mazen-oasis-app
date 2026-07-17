import { CalendarDaysIcon, UserIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Account"
}

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user)
    throw new Error("Not authenticated");

  const firstName = user.name?.split(" ")[0] ?? "Guest";
  const initials = user.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "G";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-3xl text-accent-400 mb-3">
          Welcome back, {firstName}
        </h1>
        <p className="text-lg text-primary-200">
          Manage your Wild Oasis account, reservations, and guest details.
        </p>
      </div>

      <section className="border border-primary-800 bg-primary-900 px-8 py-7">
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-primary-800 flex items-center justify-center text-3xl font-semibold text-accent-400">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "User profile picture"}
                fill
                className="object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-primary-400">
              Account details
            </p>
            <h2 className="text-2xl font-semibold text-primary-50 mt-1">
              {user.name ?? "Guest user"}
            </h2>
            <p className="text-primary-300 mt-1">
              {user.email ?? "No email available"}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <Link
          href="/account/reservations"
          className="border border-primary-800 px-6 py-5 hover:bg-primary-900 transition-colors"
        >
          <CalendarDaysIcon className="h-7 w-7 text-accent-400 mb-4" />
          <h3 className="text-xl font-semibold text-primary-100">
            Reservations
          </h3>
          <p className="text-primary-300 mt-2">
            View, edit, or cancel your upcoming stays.
          </p>
        </Link>

        <Link
          href="/account/profile"
          className="border border-primary-800 px-6 py-5 hover:bg-primary-900 transition-colors"
        >
          <UserIcon className="h-7 w-7 text-accent-400 mb-4" />
          <h3 className="text-xl font-semibold text-primary-100">
            Guest profile
          </h3>
          <p className="text-primary-300 mt-2">
            Keep your nationality and ID information up to date.
          </p>
        </Link>
      </div>
    </div>
  );
}
