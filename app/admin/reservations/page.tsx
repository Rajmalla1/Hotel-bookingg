import getCurrentUser from "@/app/actions/getCurrentUser"
import getReservations from "@/app/actions/getReservations"
import ClientOnly from "@/app/components/ClientOnly"
import { EmptyState } from "@/app/components/EmptyState"
import ReservationsClient from "./ReservationsClient"

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please Login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations Found"
          subtitle="Looks like you have no reservations on your rooms"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}
export default ReservationsPage