import getCurrentUser from "@/app/actions/getCurrentUser"
import getUsers from "@/app/actions/getUsers"
import ClientOnly from "@/app/components/ClientOnly"
import { EmptyState } from "@/app/components/EmptyState"
import UsersClient from "./UsersClient"

const USers = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    )
  }

  const users = await getUsers();

  if (users.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Rooms listed"
          subtitle="Looks like you haven't posted any rooms yet"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <UsersClient
        users={users.map(user => ({
          ...user,
          emailVerified: user.emailVerified ? user.emailVerified.toISOString() : null
        }))}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default USers
