"use client"

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { MdAddCircleOutline, MdOutlineLocalOffer, MdOutlineRoom } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import useRentModal from "../hooks/useRentModal";
import OfferModal from "../components/Modal/OfferModal";
import useOfferModal from "../hooks/useOfferModal";

const adminMenu = [
    // { label: 'Dashboard', href: 'admin', icon: MdOutlineDashboard, },
    { label: 'Users', href: 'admin/users', icon: FiUsers },
    { label: 'Rooms', href: 'admin/properties', icon: MdOutlineRoom },
    { label: 'Bookings', href: 'admin/reservations', icon: TbBrandBooking },
    { label: 'Offers', href: 'admin/offers', icon: MdOutlineLocalOffer },

]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const rentModal = useRentModal();
    const offerModal = useOfferModal();
    const router = useRouter();



    const onRent = () => {
        // Open Rent Modal
        rentModal.onOpen()
    }
    const onOffer = () => {
        // Open Offer Modal
        offerModal.onOpen()
    }

    return (
        <div className="grid grid-cols-8 gap-4 overflow-x-hidden">
            <aside className="sticky top-0 h-[85dvh] col-span-1 min-w-[200px] bg-blue-50 py-10 px-4 flex flex-col justify-between">
                <div className="flex flex-col gap-2 overflow-y-hidden">
                    {adminMenu.map(({ label, href, icon }) => (
                        <Link
                            key={href}
                            href={`/${href}`}
                            className={`flex items-center gap-2 px-4 py-2 rounded ${pathname === href ? "bg-blue-200" : "bg-transparent"
                                } hover:bg-blue-300 hover:gap-3 transition-all ease-in duration-200`}
                        >
                            {icon && React.createElement(icon, { size: 20 })}
                            <small className=" text-gray-500">{label}</small>
                        </Link>
                    ))}
                    <span className="mt-3">
                        <hr />
                        <span className="mt-2 flex flex-col gap-2">
                            <span
                                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-300 hover:gap-3 transition-all ease-in duration-200 cursor-pointer"
                                onClick={onRent}
                            >
                                <MdAddCircleOutline size={20} />
                                <small className=" text-gray-500">List a Room</small>
                            </span>
                            <span
                                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-300 hover:gap-3 transition-all ease-in duration-200 cursor-pointer"
                                onClick={() => router.push("/admin/offers/new")}
                            >
                                <MdAddCircleOutline size={20} />
                                <small className=" text-gray-500">Create an Offer</small>
                            </span>
                        </span>
                    </span>
                </div>
                <div
                    className="cursor-pointer text-sm bg-blue-100 hover:bg-blue-200 hover:text-blue-800 hover:gap-3 p-4 rounded transition-all ease-in-out duration-200 flex items-center gap-2"
                    onClick={() => {
                        toast.success("Logout successful")
                        setTimeout(() => {
                            signOut()
                            router.replace("/")
                        }, 500)
                    }}
                >
                    <FiLogOut size={20} />
                    Logout
                </div>
            </aside>
            <main className="col-span-7 bg-white px-6 pt-6 overflow-y-hidden">{children}</main>
        </div>
    );
}