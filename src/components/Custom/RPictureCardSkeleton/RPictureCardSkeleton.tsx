import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import BaseCotainer from '../BaseCotainer/BaseCotainer';

interface RPictureCardSkeletonProps {
  isNoContainer?: boolean;
}
const RPictureCardSkeleton = ({ isNoContainer = false }: RPictureCardSkeletonProps) => {
  return (
    <BaseCotainer isNoContainer={isNoContainer}>
      <div className="w-full py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 gap-y-10">
          {new Array(30).fill(0).map((_, index) => (
            <div key={index} className="w-full">
              <Skeleton className="w-full aspect-[27/26] rounded-lg" />
              <Skeleton className="w-full max-w-44 h-5 mt-3" />
              <Skeleton className="w-full max-w-20 h-5 mt-2" />
              <Skeleton className="w-full max-w-20 h-5 mt-2" />
              <Skeleton className="w-full max-w-28 h-5 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </BaseCotainer>
  );
};

export default RPictureCardSkeleton;
