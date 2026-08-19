import React from 'react';
import { RoomAmenity } from '@/lib/constant/rooms';

interface RoomAmenitiesProps {
  amenities: RoomAmenity[];
}

const RoomAmenities = ({ amenities }: RoomAmenitiesProps) => {
  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold mb-6">房源設施</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {amenities.map((amenity) => (
          <div key={amenity.label} className="flex items-center gap-4">
            <amenity.icon size={22} />
            <p className="text-sm">{amenity.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAmenities;
