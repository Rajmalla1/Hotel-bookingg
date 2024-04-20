import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

interface IParams {
    id?: string
}

export async function PATCH(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }

    const { id } = params

    if (!id || typeof id !== "string") {
        throw new Error("Invalid ID")
    }

    const user = await prisma.user.update({
        where: { id },
        data: { status: 'BANNED' }
    })

    return NextResponse.json(user)

}

