"use client"

import { useRouter } from "next/navigation"
import React from "react"


import { IoCheckmarkDoneCircleOutline } from "react-icons/io5"
import { Button } from "../components/Button"
import { Container } from "../components/Container"


const PaymentClient: React.FC = () => {
    const router = useRouter()

    return (
        <Container>
            <section className=" w-full">
                <div className="grid place-items-center min-h-[65vh] w-xl">
                    <div className="bg-blue-300 h-[40vh] w-[40vw] text-white px-7 py-4 rounded shadow flex flex-col gap-4 items-center justify-between">
                        <span>
                            <IoCheckmarkDoneCircleOutline size={48} />
                        </span>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <h2 className="text-4xl font-bold ">Payment Successful</h2>
                            <h3 className="text-2xl font-bold ">Reservation Done</h3>
                            <p>Go to reservations to see your booking</p>
                        </div>
                        <span className="min-w-[300px] max-w-[400px]">
                            <Button label="Go to Home" onClick={() => router.push(`/`)} />
                        </span>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default PaymentClient
