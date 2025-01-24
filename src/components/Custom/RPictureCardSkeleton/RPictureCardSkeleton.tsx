import { Skeleton } from "@/components/ui/skeleton"
import React from 'react'

const RPictureCardSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="w-full h-40 rounded-md" />
      <Skeleton className="w-full max-w-44 h-5 mt-3" />
      <Skeleton className="w-full max-w-20 h-5 mt-2" />
      <Skeleton className="w-full max-w-20 h-5 mt-2" />
      <Skeleton className="w-full max-w-28 h-5 mt-2" />
    </div>
  )
}

export default RPictureCardSkeleton