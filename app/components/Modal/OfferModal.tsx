"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Range } from "react-date-range"


import useOfferModal from "@/app/hooks/useOfferModal"
import Heading from "../Heading"
import Calendar from "../Input/Calendar"
import Input from "../Input/Input"
import { Modal } from "./Modal"


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};
const OfferModal = () => {
  const router = useRouter()
  const offerModal = useOfferModal();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);


  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      price: 0,
      startDate: Date.now(),
      endDate: Date.now() + 3,
    },
  })

  const price = watch("price")
  // const dateRange = watch("range")



  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }



  // submit function
  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    setIsLoading(true)
    axios.post("/api/offers", data).then(() => {
      toast.success("Offer Created")
      router.refresh()
      reset()
      offerModal.onClose()
    }).catch(() => toast.error("Something Went Wrong!!!")
    ).finally(() => setIsLoading(false))
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Now, Set your Price" subtitle="How much do you charge per night?" />
      <Input
        id="price"
        label="Price"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Calendar
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
      />
    </div>
  )


  return (
    <Modal
      title="List Your Offer"
      isOpen={offerModal.isOpen}
      onClose={offerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Create"
      body={bodyContent}
    />
  )
}

export default OfferModal
