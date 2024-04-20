"use client"

import React, {useEffect} from "react"
import EmptyState from "@/app/components/EmptyState"

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({error}) => {
  useEffect(() => {
    console.log("Error.tsx, line 13")
    console.error(error)
  }, [error])
  return (
    <EmptyState
      title="Oops!!!"
      subtitle="Something Went Wrong."
    />
  )
}
export default ErrorState