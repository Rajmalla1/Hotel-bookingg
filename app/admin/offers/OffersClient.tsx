"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useCallback, useState } from "react"
import { toast } from "react-hot-toast"

import { Container } from "@/app/components/Container"
import Heading from "@/app/components/Heading"
import { SafeOffer } from "@/app/types"

interface OffersClientProps {
  offers: SafeOffer[]
}

const OffersClient = ({ offers }: { offers: any }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
      axios.patch(`/api/offers/${id}`).then(() => {
        toast.success("User Banned")
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

  return (
    <Container>
      <Heading
        title="Offers"
        subtitle="List of your offers"
      />
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
                    {offer?.startDate}
                  </td>
                  <td className="px-6 py-4">
                    {offer?.endDate}
                  </td>
                  <td className="px-6 py-4">
                    {offer?.status ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 relative">
                    {offer.status === 'ACTIVE' && (
                      <button className="font-medium text-red-600 hover:underline focus:outline-none" onClick={() => onCancel(offer.id)}>
                        Delete Offer
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
