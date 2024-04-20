// pages/api/initAdmin.js
import prisma from "@/app/libs/prismadb"
import bcrypt from "bcryptjs"


export async function createAdminIfNotExist() {
  // console.log("Creating admin if not exist");

  const user = await prisma.user.findUnique({
    where: {
      email: "admin@rajhotel.com"
    }
  });

  if (!user) {
    const password = "admin";
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        name: "RajHotel Admin",
        email: "admin@rajhotel.com",
        hashedPassword,
        emailVerified: new Date(Date.now()),
        role: "admin",
        image: "/images/logo-sm.png"
      }
    })
  }
}