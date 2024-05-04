"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"

import { Container } from "@/app/components/Container"
import Heading from "@/app/components/Heading"
import { SafeOffer } from "@/app/types"
import { Button } from "@/app/components/Button"

interface OffersClientProps {
  offers: SafeOffer[]
}




const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const OffersClient = ({ offers }: { offers: any }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      const response = await axios.get("/api/offers")
      console.log("🚀 ~ file: OffersClient.tsx ~ fetchOffers ~ response", response)
    } catch (error) {
      console.log("🚀 ~ file: OffersClient.tsx ~ fetchOffers ~ error", error)
    }
  }


  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
      axios.patch(`/api/offers/${id}`).then(() => {
        toast.success("Offer Stashed")
        router.refresh()
      }).catch((error) => {
        console.log(error)
        toast.error(error?.response?.data?.error)
      }).finally(() => {
        setDeletingId("")
      })
    },
    [router],
  )
  const formatDate = (date: string) => {
    const dateValue = new Date(date);
    const formattedDate = dateValue.getDate() + "-" + (Months[dateValue.getMonth()]) + "-" + dateValue.getFullYear();
    return formattedDate;
  }

  return (
    <Container>
      <span className="grid grid-cols-5">
        <span className="col-span-4">

          <Heading
            title="Offers"
            subtitle="List of your offers"
          />
        </span>
        <span className="col-span-1">
          <button
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-md"
            onClick={() => router.push("/admin/offers/new")}
          >Add new Offer</button>
        </span>
      </span>
      <div className="mt-10 h-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-900 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.N.
                </th>
                <th scope="col" className="px-6 py-3">
                  Offer Pecentage
                </th>
                <th scope="col" className="px-6 py-3">
                  Valid From
                </th>
                <th scope="col" className="px-6 py-3">
                  Valid Till
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer: SafeOffer, id: number) => (
                <tr className="odd:bg-white even:bg-gray-100  border-b" key={id}>
                  <th scope="row" className="px-6 py-4">
                    {id + 1}
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {offer?.price}
                  </th>
                  <td className="px-6 py-4">
                    {formatDate(offer?.startDate)}
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(offer?.endDate)}
                  </td>
                  <td className="px-6 py-4">
                    {offer?.status.toLocaleUpperCase()}
                  </td>
                  <td className="px-6 py-4 relative">
                    {offer.status.toLocaleLowerCase() === 'active' && (
                      <button className="font-medium text-red-600 hover:underline focus:outline-none" onClick={() => onCancel(offer.id)}>
                        Stash Offer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>

  )
}

export default OffersClient
