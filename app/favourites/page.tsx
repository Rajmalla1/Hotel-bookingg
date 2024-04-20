import EmptyState from "@/app/components/EmptyState"
import ClientOnly from "@/app/components/ClientOnly"

import getCurrentUser from "@/app/actions/getCurrentUser"
import getFavouriteListings from "@/app/actions/getFavouriteListings"

import FavouritesClient from "./FavouritesClient"

const FavouritesPage = async () => {
  const listings = await getFavouriteListings()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favourites"
          subtitle="Looks like you haven't picked any favourotes"
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <FavouritesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )

}


export default FavouritesPage