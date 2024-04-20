"use client"

import React, { useCallback, useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineMenu } from "react-icons/ai"
import { signOut } from "next-auth/react"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import useRentModal from "@/app/hooks/useRentModal"

import { SafeUser } from "@/app/types"
import { Avatar } from "../Avatar"
import { MenuItem } from "./MenuItem"
import { useRouter } from "next/navigation"
import { FiLogOut } from "react-icons/fi"

interface UserMenuProps {
  currentUser?: SafeUser | null

}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)
  console.log(currentUser);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    // Open Login if No user logged in
    if (!currentUser) return loginModal.onOpen()

    // Open Rent Modal
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative select-none">
      <div className="flex flex-row items-center gap-3 ">
        <div
          onClick={toggleOpen}
          className="
						p-4
						md:py-1
						md:px-2
						border-[1px]
						border-neutral-100
						flex
						flex-row
						items-center
						gap-3
						rounded-full
						cursor-pointer
						hover:shadow-md
						transition
				"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        // w-[40vw]
        <div
          className="
            min-w-[200px]
						absolute
						rounded-md
						shadow-md
						md:w-3/4
						bg-white
						overflow-hidden
						right-0
						top-12
						text-sm
				"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/about")
                    setIsOpen(false)
                  }}
                  label="About Us"
                />
                {currentUser?.role === "USER" && (
                  <>
                    <MenuItem
                      onClick={() => {
                        router.push("/trips")
                        setIsOpen(false)
                      }}
                      label="My Bookings"
                    />
                    <MenuItem
                      onClick={() => {
                        router.push("/favourites")
                        setIsOpen(false)
                      }}
                      label="My Favorites"
                    />
                  </>
                )}
                {currentUser?.role === "admin" && (
                  <>
                    <hr />
                    <MenuItem
                      onClick={() => {
                        router.push("/admin")
                        setIsOpen(false)
                      }}
                      label="Dashboard"
                    />
                  </>
                )}
                <hr />
                <div
                  onClick={() => {
                    toast.success("Logout successful")
                    setTimeout(() => {
                      signOut();
                      router.replace("/")
                    }, 500)
                  }}
                  className="
                    px-4
                    py-3
                    hover:bg-neutral-200
                    text-red-400
                    transition
                    font-semibold
                    flex gap-2
                  "
                >
                  <FiLogOut size={20} />
                  Log out
                </div>
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="SignUp" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
