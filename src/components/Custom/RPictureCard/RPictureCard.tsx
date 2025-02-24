'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Picture } from '@/app/components/Pictures/PictureList';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  picture: Picture;
  isHaveTab?: boolean;
}
const RPictureCard = ({ picture, isHaveTab = false }: RPictureCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCarouselBtn, setShowCarouselBtn] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const mockImgList = [
    'https://fastly.picsum.photos/id/1/800/600.jpg?hmac=MN2CLqgjzudlZgIvCxqKMVfNsSGWPQcnLBQicn1hNUs',
    'https://fastly.picsum.photos/id/600/800/600.jpg?hmac=rHNjsSwpyn8isB00iRvTo4PlNAMJb0ADu76pf0Z8wtw',
  ];

  const handleFavorite = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
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
      <Card
        className={cn('border-none shadow-none cursor-pointer')}
        onMouseEnter={() => setShowCarouselBtn(true)}
        onMouseLeave={() => setShowCarouselBtn(false)}
      >
        <CardHeader className="px-0">
          <CardTitle className="relative">
            <div className={cn('w-full', isLoading ? 'bg-gray-400' : '')}>
              <Carousel className="w-full" setApi={setApi} opts={{duration: 20}}>
                <CarouselContent isRounded>
                  {mockImgList.map((item, index, arr) => (
                    <CarouselItem key={index}>
                      <Image
                        className={cn('rounded-md w-full h-full')}
                        src={item}
                        alt="test"
                        width={300}
                        height={300}
                        onLoad={() =>
                          index === arr.length - 1 && setIsLoading(false)
                        }
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {showCarouselBtn && (
                  <>
                    <CarouselPrevious className="mx-3" isAbsolute />
                    <CarouselNext className="mx-3" isAbsolute />
                  </>
                )}
              </Carousel>
            </div>
            {/* tab標籤 */}
            {isHaveTab && (
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
            <RDotNavgation selectedIndex={selectedIndex} length={mockImgList.length} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <p className="text-sm max-w-44 truncate">南韓Gujwa-eup, Cheju</p>
            <span className="flex items-center gap-1">
              <Star size={14} fill="text-heart" color="text-heart" />
              <p className="text-sm">4.84</p>
            </span>
          </div>
        </CardContent>
        <CardDescription>
          <p className="text-sm">距離 1,079公里</p>
        </CardDescription>
        <CardDescription>
          <p className="text-sm">2月8日至13日</p>
        </CardDescription>
        <CardContent>
          <p className="text-sm font-bold">$2,708 TWD 晚</p>
        </CardContent>
      </Card>
    </>
  );
};

export default RPictureCard;
