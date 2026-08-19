'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BLUR_DATA_URL, cn } from '@/lib/utils';
import { Room } from '@/lib/constant/rooms';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import RDotNavgation from '@/components/Custom/RDotNavgation/RDotNavgation';

interface RoomGalleryProps {
  room: Room;
}

const RoomGallery = ({ room }: RoomGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      {/* 手機版：單張輪播 */}
      <div className="md:hidden relative">
        <Carousel setApi={setApi} opts={{ duration: 20 }}>
          <CarouselContent isRounded>
            {room.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  className="w-full aspect-[3/2] object-cover"
                  src={image}
                  alt={room.title}
                  width={800}
                  height={600}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <RDotNavgation
          selectedIndex={selectedIndex}
          length={room.images.length}
        />
      </div>
      {/* 桌機版：1 大 4 小 */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[420px] lg:h-[480px] rounded-xl overflow-hidden">
        {room.images.slice(0, 5).map((image, index) => (
          <div
            key={index}
            className={cn('relative', { 'col-span-2 row-span-2': index === 0 })}
          >
            <Image
              className="object-cover"
              src={image}
              alt={room.title}
              sizes="(max-width: 1120px) 50vw, 560px"
              fill
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default RoomGallery;
