import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const RPictureCardSkeleton = () => {
  return (
    <div className="w-full my-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 gap-y-10">
        {new Array(30).fill(0).map((_, index) => (
          <div key={index} className="w-full">
            <Skeleton className="w-full h-40 rounded-md" />
            <Skeleton className="w-full max-w-44 h-5 mt-3" />
            <Skeleton className="w-full max-w-20 h-5 mt-2" />
            <Skeleton className="w-full max-w-20 h-5 mt-2" />
            <Skeleton className="w-full max-w-28 h-5 mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RPictureCardSkeleton;
