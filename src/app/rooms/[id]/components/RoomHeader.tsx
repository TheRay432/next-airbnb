import React from 'react';
import { Heart, Share, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Room } from '@/lib/constant/rooms';

interface RoomHeaderProps {
  room: Room;
}

const RoomHeader = ({ room }: RoomHeaderProps) => {
  return (
    <div className="py-6">
      <h1 className="text-xl md:text-2xl font-bold">{room.title}</h1>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-y-2">
        <div className="flex flex-wrap items-center gap-x-2 text-sm">
          <span className="flex items-center gap-1">
            <Star size={14} fill="currentColor" />
            {room.rating}
          </span>
          <span>·</span>
          <span className="underline">{room.reviewCount} 則評價</span>
          <span>·</span>
          <span className="underline">{room.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1 underline">
            <Share size={16} />
            分享
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 underline">
            <Heart size={16} />
            儲存
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
