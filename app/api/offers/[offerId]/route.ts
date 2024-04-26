import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"

interface IParams {
  offerId?: string
}

export async function PATCH(
  request: Request,
  { params }: { params: IParams }
) {
  const { offerId } = params

  if (!offerId || typeof offerId !== "string") {
    throw new Error("Invalid ID")
  }

  const user = await prisma.offers.update({
    where: { id: offerId },
    data: { status: 'ARCHIVE' }
  })

  return NextResponse.json(user)

}