import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {

    const body = await request.json()
    const { price, startDate, endDate } = body

    const offerExists = await prisma.offers.findMany({
        where: { status: "ACTIVE" }
    })
    if (offerExists.length > 0) {
        return NextResponse.json({ error: "There is an active offer already" }, { status: 400 });
    }

    const offer = await prisma.offers.create({
        // @ts-ignore
        data: {
            price: parseInt(price, 10),
            startDate,
            endDate,
            status: "ACTIVE"
        }
    })

    return NextResponse.json({ offer }, { status: 201 })
}

export async function GET(request: Request) {

    const offer = await prisma.offers.findFirst({
        where: { status: "ACTIVE" }
    })

    return NextResponse.json({ offer }, { status: 201 })
}