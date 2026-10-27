'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import RPictureCard from '@/components/Custom/RPictureCard/RPictureCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import RPictureCardSkeleton from '@/components/Custom/RPictureCardSkeleton/RPictureCardSkeleton';
import REmptyState from '@/components/Custom/REmptyState/REmptyState';
import { RoomListItem } from '@/types/room';

const PAGE_SIZE = 18;

interface PictureContainerProps {
  rooms: RoomListItem[];
}
const PictureContainer = ({ rooms }: PictureContainerProps) => {
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
  const visibleRooms = rooms.slice(0, loadedCount);
  const hasMore = loadedCount < rooms.length;

  /** 取得下一頁的資料 */
  const fetchMoreData = () => {
    setLoadedCount((prev) => prev + PAGE_SIZE);
  };

  if (rooms.length === 0) return <REmptyState />;

  return (
    <InfiniteScroll
      dataLength={visibleRooms.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<RPictureCardSkeleton isNoContainer />}
      scrollThreshold={0.35}
      endMessage={<h4 className="text-center mt-10">沒有更多資料了</h4>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 gap-y-10">
        {visibleRooms.map((room) => (
          <div key={room.id} className={cn('w-full')}>
            <RPictureCard room={room} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PictureContainer;
