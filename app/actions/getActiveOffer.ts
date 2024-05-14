import prisma from "@/app/libs/prismadb"


export default async function getActiveOffer() {
  try {
    // const { id, name, email, emailVerified, role, status } = params
    let offer = await prisma.offers.findFirst({
      where: { status: "ACTIVE" }
    })
    // const safeOffers = {
    //   ...offer,
    //   createdAt: offer?.createdAt.toISOString(),
    //   updatedAt: offer?.updatedAt.toISOString(),
    //   startDate: offer?.startDate.toISOString(),
    //   endDate: offer?.endDate.toISOString(),
    // }
    return offer
  } catch (error: any) {
    throw new Error(error)
  }
}