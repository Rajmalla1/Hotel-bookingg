import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {

    const body = await request.json()
    const { price, startDate, endDate } = body

    const listing = await prisma.offers.create({
        // @ts-ignore
        data: {
            price: parseInt(price, 10),
            startDate,
            endDate,
            status: "ACTIVE"
        }
    })

    return NextResponse.json(listing)
}
