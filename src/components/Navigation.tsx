import { auth } from "@/lib/auth"
import Image from "next/image";
import Link from "next/link"
export default async function Navigation() {

  const session = await auth();
  console.log(session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li >

          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex items-center gap-4"
          >
            {session?.user && <div className="relative aspect-square h-8">
              <Image src={session?.user?.image ?? ""} alt="User profile picture" fill className="object-cover rounded-full" />
            </div>}
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  )
}
