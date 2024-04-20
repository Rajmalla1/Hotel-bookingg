"use client"

import React, { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import axios from "axios"

import { SafeListing, SafeUser } from "@/app/types"
import { Container } from "@/app/components/Container"
import Heading from "@/app/components/Heading"
import ListingCard from "@/app/components/Listings/ListingCard"
import { Avatar } from "@/app/components/Avatar"

interface UsersClientProps {
  users: SafeUser[]
  currentUser?: SafeUser | null
}

const UsersClient: React.FC<UsersClientProps> = (
  {
    users,
    currentUser
  }
) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
      axios.patch(`/api/users/${id}`).then(() => {
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
        title="Users"
        subtitle="List of your customers"
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
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Email Verified
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, id) => (
                <tr className="odd:bg-white even:bg-gray-100  border-b" key={id}>
                  <th scope="row" className="px-6 py-4">
                    {id + 1}
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-2">
                    <span className='rounded-full h-6 w-6 '>
                      <Avatar src={user?.image} />
                    </span>
                    {user?.name}
                  </th>
                  <td className="px-6 py-4">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4">
                    {user?.status}
                  </td>
                  <td className="px-6 py-4">
                    {user?.emailVerified ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 relative">
                    {user.status === 'ACTIVE' && (
                      <button className="font-medium text-red-600 hover:underline focus:outline-none" onClick={() => onCancel(user.id)}>
                        Ban User
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

export default UsersClient
