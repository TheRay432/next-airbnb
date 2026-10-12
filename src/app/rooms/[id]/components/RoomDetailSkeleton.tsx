import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';
import { cn } from '@/lib/utils';

const RoomDetailSkeleton = () => {
  return (
    <BaseCotainer>
      <div className="max-w-[1120px] mx-auto pb-24 lg:pb-8">
        {/* 標題 */}
        <div className="py-6">
          <Skeleton className="w-full max-w-96 h-7" />
          <div className="mt-2 flex items-center justify-between gap-4">
            <Skeleton className="w-full max-w-72 h-5" />
            <Skeleton className="hidden md:block w-36 h-5 shrink-0" />
          </div>
        </div>
        {/* 相片牆：手機版單張 */}
        <Skeleton className="md:hidden w-full aspect-[3/2] rounded-xl" />
        {/* 相片牆：桌機版 1 大 4 小 */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[420px] lg:h-[480px] rounded-xl overflow-hidden">
          {new Array(5).fill(0).map((_, index) => (
            <Skeleton
              key={index}
              className={cn('rounded-none', {
                'col-span-2 row-span-2': index === 0,
              })}
            />
          ))}
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-x-20">
          <div className="w-full lg:w-7/12">
            {/* 房源摘要 */}
            <div className="py-8 border-b border-lightgray">
              <Skeleton className="w-full max-w-80 h-6" />
              <Skeleton className="w-full max-w-56 h-5 mt-2" />
              <div className="mt-8 flex flex-col gap-6">
                {new Array(3).fill(0).map((_, index) => (
                  <div key={index} className="flex gap-4">
                    <Skeleton className="w-[22px] h-[22px] shrink-0 mt-1" />
                    <div className="w-full">
                      <Skeleton className="w-full max-w-40 h-5" />
                      <Skeleton className="w-full max-w-64 h-4 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 房東 */}
            <div className="py-8 border-b border-lightgray">
              <Skeleton className="w-40 h-6 mb-6" />
              <div className="flex items-center gap-4">
                <Skeleton className="w-[72px] h-[72px] shrink-0 rounded-full" />
                <div className="w-full">
                  <Skeleton className="w-full max-w-32 h-5" />
                  <Skeleton className="w-full max-w-24 h-4 mt-2" />
                </div>
              </div>
            </div>
            {/* 房源介紹 */}
            <div className="py-8 border-b border-lightgray">
              <Skeleton className="w-40 h-6 mb-4" />
              {new Array(4).fill(0).map((_, index) => (
                <Skeleton key={index} className="w-full h-4 mb-3 last:mb-0" />
              ))}
            </div>
            {/* 房源設施 */}
            <div className="py-8">
              <Skeleton className="w-32 h-6 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {new Array(6).fill(0).map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Skeleton className="w-[22px] h-[22px] shrink-0" />
                    <Skeleton className="w-full max-w-32 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 訂房卡 */}
          <aside className="hidden lg:block w-5/12">
            <div className="py-8">
              <div className="border border-lightgray rounded-xl shadow-lg p-6">
                <Skeleton className="w-40 h-7" />
                <Skeleton className="w-full h-[104px] mt-4 rounded-lg" />
                <Skeleton className="w-full h-12 mt-4 rounded-lg" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </BaseCotainer>
  );
};

export default RoomDetailSkeleton;
