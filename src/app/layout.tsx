import { ReactNode } from "react"
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google"
import { ReservationProvider } from "@/components/ReservationContext";
export const metadata: Metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome to the Wild Oasis"
  },
  description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests."
}

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap"
})

interface RootLayoutProps {
  children: ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return <html lang="en">
    <body className={`antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col ${josefin.className}`} >
      <ReservationProvider>
        {children}
      </ReservationProvider>
    </body>
  </html>
}