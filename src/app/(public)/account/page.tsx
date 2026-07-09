import { Metadata } from "next"
import {auth} from "@/lib/auth"

export const metadata:Metadata={
  title:"Account"
}
export default async function page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];
  // console.log(firstName);
  

  return (
    <div>

        <h1>
        Welcome {firstName}
        </h1>
    </div>
  )
}
