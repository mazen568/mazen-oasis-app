import { ReactNode } from "react"
import Header from "@/components/Header";
import "@/styles/globals.css";


interface RootLayoutProps {
    children: ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
   return <>
        <Header />
        <div className=" flex-1 px-8 py-12 grid">
            <main className="max-w-7xl mx-auto w-full">
                    {children}
            </main>
        </div>
    </>

}