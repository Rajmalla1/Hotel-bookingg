import prisma from "@/app/libs/prismadb"


export default async function getOffers() {
  try {
    // const { id, name, email, emailVerified, role, status } = params
    const offers = await prisma.offers.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    offers.forEach(async (offer) => {
      if (offer.endDate < new Date(Date.now())) {
        await prisma.offers.update({
          where: { id: offer.id },
          data: { status: 'ARCHIVE' }
        })
      }
    })
    const safeOffers = offers.map((offer) => ({
      ...offer,
      createdAt: offer.createdAt.toISOString(),
      updatedAt: offer.updatedAt.toISOString(),
      startDate: offer.startDate.toISOString(),
      endDate: offer.endDate.toISOString(),
    }))
    return safeOffers
  } catch (error: any) {
    throw new Error(error)
  }
}