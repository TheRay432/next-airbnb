import React from 'react';
import PictureContainer from './PictureContainer';
import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';
import { RoomListItem } from '@/types/room';

interface PictureListProps {
  placeId?: string;
}

const PictureList = async ({ placeId }: PictureListProps) => {
  // 沒帶地點就回傳全部房源；房源很少變動，快取一小時
  const query = placeId ? `?region=${encodeURIComponent(placeId)}` : '';
  const res = await fetch(`${process.env.API_URL}/api/rooms${query}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`/api/rooms${query} 回應 ${res.status}`);
  const rooms: RoomListItem[] = await res.json();

  return (
    <BaseCotainer>
      <div className="w-full py-4">
        <PictureContainer rooms={rooms} />
      </div>
    </BaseCotainer>
  );
};

export default PictureList;
