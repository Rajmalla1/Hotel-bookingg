import { Listing, Reservation, User } from "@prisma/client"

export type SafeListing = Omit<
  Listing,
  "createdAt"
> & {
  createdAt: string
}

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing" | "specialRequests"
> & {
  createdAt: string
  startDate: string
  endDate: string
  listing: SafeListing
  specialRequests: string | null

}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}