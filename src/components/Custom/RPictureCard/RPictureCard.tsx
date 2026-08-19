'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Room } from '@/lib/constant/rooms';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { BLUR_DATA_URL, cn, formatPrice } from '@/lib/utils';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import RDotNavgation from "../RDotNavgation/RDotNavgation";
import { Button } from "@/components/ui/button";

export interface RPictureCardProps {
  room: Room;
}
const RPictureCard = ({ room }: RPictureCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCarouselBtn, setShowCarouselBtn] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const handleFavorite = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

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
      <Link href={`/rooms/${room.id}`} target="_blank" rel="noopener noreferrer">
        <Card
          className={cn('border-none shadow-none cursor-pointer')}
          onMouseEnter={() => setShowCarouselBtn(true)}
          onMouseLeave={() => setShowCarouselBtn(false)}
        >
          <CardHeader className="px-0">
            <CardTitle className="relative">
              <div className="w-full">
                <Carousel className="w-full" setApi={setApi} opts={{duration: 20}}>
                  <CarouselContent isRounded>
                    {room.images.map((item, index) => (
                      <CarouselItem key={index}>
                        <Image
                          className={cn('w-full h-full aspect-[27/26] object-cover')}
                          src={item}
                          alt={room.title}
                          width={300}
                          height={300}
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {showCarouselBtn && (
                    // 卡片整張是連結，切圖時要擋掉導頁
                    <span onClick={(e) => e.preventDefault()}>
                      <CarouselPrevious className="mx-3" isAbsolute />
                      <CarouselNext className="mx-3" isAbsolute />
                    </span>
                  )}
                </Carousel>
              </div>
              {/* tab標籤 */}
              {room.isGuestFavorite && (
                <Button variant="tab" size="tab" className="absolute top-2 left-2">
                  <span>旅客精選</span>
                </Button>
              )}
              {/* 是否收藏 */}
              <Heart
                className="absolute top-2 right-2 hover:scale-110  transition-all"
                color="white"
                fill={isFavorite ? 'rgb(255, 0, 0)' : 'rgba(0, 0, 0, 0.5)'}
                onClick={(e) => handleFavorite(e)}
              />
              {/* 圓點導航 */}
              <RDotNavgation selectedIndex={selectedIndex} length={room.images.length} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p className="text-sm max-w-44 truncate">{room.location}</p>
              <span className="flex items-center gap-1">
                <Star size={14} fill="text-heart" color="text-heart" />
                <p className="text-sm">{room.rating}</p>
              </span>
            </div>
          </CardContent>
          <CardDescription>
            <p className="text-sm">{room.distance}</p>
          </CardDescription>
          <CardDescription>
            <p className="text-sm">{room.dateRange}</p>
          </CardDescription>
          <CardContent>
            <p className="text-sm font-bold">{formatPrice(room.price)} TWD 晚</p>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default RPictureCard;
