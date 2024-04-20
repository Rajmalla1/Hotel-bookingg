import {NextResponse} from "next/server"
import bcrypt from "bcryptjs"

import prisma from "@/app/libs/prismadb"


export async function POST(
  request: Request
) {
  const body = await request.json()
  const {name, email, password} = body
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword
    }
  })
  const createdUser = await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      favouriteIds: true,
      accounts: true,
      listings: true,
      reservations: true,
      hashedPassword: false
    },

  })

  return NextResponse.json(createdUser)
}