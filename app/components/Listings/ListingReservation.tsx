"use client"

import React, { useState } from "react"
import { Range } from "react-date-range"
import Calendar from "@/app/components/Input/Calendar"
import { Button } from "../Button"
import Input from "../Input/Input"

interface ListingReservationProps {
  price: number
  dateRange: Range
  totalPrice: number
  onChangeDate: (value: Range) => void
  onSubmit: () => void
  specialRequests?: (requests: string) => void
  disabled?: boolean
  disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = (
  {
    price,
    totalPrice,
    dateRange,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
    specialRequests
  }) => {
  const [requests, setRequests] = useState('')
  const handleRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequests(e.target.value)
    if (specialRequests) {
      specialRequests(e.target.value)
    }
  }

  return (
    <div
      className="
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
      "
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">Rs {price}</div>
        <div className="font-light text-neutral-600">/night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="w-full p-2 relative">
        <input
          type="text"
          value={requests}
          onChange={handleRequest}
          placeholder="Special requests"
          className="peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition focus:border-gray-700"
        />
      </div>
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label="Reserve"
          onClick={onSubmit}
        />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div className="">Total</div>
        <div className="">Rs {totalPrice}</div>
      </div>
    </div>
  )
}
export default ListingReservation