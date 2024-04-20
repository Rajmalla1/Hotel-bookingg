"use client"

import Image from "next/image"
import {useRouter} from "next/navigation"

export const Logo = () => {
  const router = useRouter()

  return (
    <>
      <Image
        onClick={() => {
          console.log("clicked")
          router.push("/")
        }}
        alt="logo"
        className="hidden md:block cursor-pointer"
        height={100}
        width={100}
        src="/images/logo.png"
      />
      <Image
        onClick={() => {
          console.log("clicked")
          router.push("/")
        }}
        alt="logo"
        className="app-logo cursor-pointer"
        height={40}
        width={40}
        src="/images/logo-sm.png"
      />
    </>

  )
}
