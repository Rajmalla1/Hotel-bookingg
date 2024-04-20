import prisma from "@/app/libs/prismadb"

// export interface IUsersParams {
//   id?: string
//   name?: number
//   email?: number
//   emailVerified?: number
//   role?: string
//   status?: string

// }

export default async function getUsers() {
  try {
    // const { id, name, email, emailVerified, role, status } = params
    const users = await prisma.user.findMany({
      where: {
        role: 'USER'
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    const safeUsers = users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }))
    return safeUsers
  } catch (error: any) {
    throw new Error(error)
  }
}