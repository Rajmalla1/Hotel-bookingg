import React from "react"

import PropertiesClient from "./PropertiesClient"
import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import { EmptyState } from "@/app/components/EmptyState"
import getListings from "@/app/actions/getListings"

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    )
  }

  const listings = await getListings({
    userId: currentUser.id,
  })

  if (listings.length === 0) {
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
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default PropertiesPage
