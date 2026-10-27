import React from 'react';
import Navbar from '@/app/components/Navbar/Navbar';
import RoomDetailSkeleton from './components/RoomDetailSkeleton';
import { LocationItem } from '@/types/location';

const Loading = async () => {
  // 地點清單通常已在快取裡，不會拖慢骨架出現
  const regionsRes = await fetch(`${process.env.API_URL}/api/regions`, {
    next: { revalidate: 3600 },
  });
  if (!regionsRes.ok) throw new Error(`/api/regions 回應 ${regionsRes.status}`);
  const locationList: LocationItem[] = await regionsRes.json();

  return (
    <>
      <div className="bg-white shadow-md">
        <Navbar locationList={locationList} />
      </div>
      <RoomDetailSkeleton />
    </>
  );
};

export default Loading;
