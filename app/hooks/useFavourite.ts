import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"

import { SafeUser } from "../types"
import useLoginModal from "@/app/hooks/useLoginModal"

interface IUseFavourite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavourite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!currentUser) return loginModal.onOpen

    try {
      let request
      if (hasFavourited) {
        request = () => axios.delete(`/api/favourites/${listingId}`).then(() => {
          toast.success("Favourite Removed")
        })
      } else {
        request = () => axios.post(`/api/favourites/${listingId}`).then(() => {
          toast.success("Favourited")
        })
      }
      await request()
      router.refresh()
    } catch (e) {
      toast.error("Something Went Wrong")
    }
  },
    [currentUser, hasFavourited, listingId, loginModal, router],
  )
  return { hasFavourited, toggleFavourite }

}

export default useFavourite