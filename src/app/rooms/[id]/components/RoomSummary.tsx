import React from 'react';
import { highlights, Room, RoomHost } from '@/lib/constant/rooms';

interface RoomSummaryProps {
  room: Room;
  host: RoomHost;
}

const RoomSummary = ({ room, host }: RoomSummaryProps) => {
  const facts = [
    `${room.guests} 位房客`,
    `${room.bedrooms} 間臥室`,
    `${room.beds} 張床`,
    `${room.baths} 間衛浴`,
  ];

  return (
    <div className="py-8 border-b border-lightgray">
      <h2 className="text-xl font-semibold">
        {room.roomType}・房東：{host.name}
      </h2>
      <p className="mt-1 text-sm text-darkgray">{facts.join(' · ')}</p>
      <div className="mt-8 flex flex-col gap-6">
        {highlights.map((highlight) => (
          <div key={highlight.title} className="flex gap-4">
            <highlight.icon className="shrink-0 mt-1" size={22} />
            <div>
              <h3 className="font-semibold">{highlight.title}</h3>
              <p className="text-sm text-darkgray">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSummary;
