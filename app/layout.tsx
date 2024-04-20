import { Nunito } from "next/font/google"
import React from "react"

import "./globals.css"

import LoginModal from "./components/Modal/LoginModal"
import RegisterModal from "./components/Modal/RegisterModal"
import RentModal from "./components/Modal/RentModal"
import SearchModal from "./components/Modal/SearchModal"

import ClientOnly from "./components/ClientOnly"
import { Navbar } from "./components/Navbar/Navbar"
import ToasterProvider from "./providers/ToasterProvider"
import getCurrentUser from "./actions/getCurrentUser"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata = {
  title: "RajHotel",
  description: "This is hotel booking system for RajHotel",
}

export default async function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode
  }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-20">{children}</div>
        {/* <script type="text/javascript">
        var s1=document.createElement("script");
        var s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/6623cf9ea0c6737bd12e87ac/1hrtu60va';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      </script> */}
      </body>
    </html>
  )
}
