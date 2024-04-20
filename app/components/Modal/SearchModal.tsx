"use client"

import { formatISO } from "date-fns"
import dynamic from "next/dynamic"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"

import { Modal } from "./Modal"

import useSearchModal from "@/app/hooks/useSearchModal"
import Heading from "../Heading"
import Calendar from "../Input/Calendar"
import Counter from "../Input/Counter"

enum STEPS {
  DATE = 0,
  INFO = 1
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEPS.DATE)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  })

  const onBack = useCallback(
    () => {
      setStep((value) => value - 1)
    },
    [],
  )
  const onNext = useCallback(
    () => {
      setStep((value) => value + 1)
    },
    [],
  )

  const onSubmit = useCallback(
    async () => {
      if (step !== STEPS.INFO) {
        return onNext()
      }

      let currentQuery = {}
      if (params) {
        currentQuery = qs.parse(params.toString())
      }

      const updatedQuery: any = {
        ...currentQuery,
        guestCount,
        roomCount,
        bathroomCount
      }
      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate)
      }
      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate)
      }
      const url = qs.stringifyUrl({
        url: "/",
        query: updatedQuery
      },
        { skipNull: true }
      )
      setStep(STEPS.DATE)
      searchModal.onClose()

      router.push(url)
    },
    [
      dateRange.endDate,
      dateRange.startDate,
      guestCount,
      roomCount,
      bathroomCount,
      params,
      router,
      onNext,
      searchModal,
      step
    ],
  )

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search"
    }
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.DATE) {
      return undefined
    }
    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="When do you plan to go?"
        subtitle="Make sure everyone is free!"
      />
      <Calendar
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
      />
    </div>
  )

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More Information"
          subtitle="Find your perfect place!"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you require?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many Bathroom do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.DATE ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  )
}

export default SearchModal