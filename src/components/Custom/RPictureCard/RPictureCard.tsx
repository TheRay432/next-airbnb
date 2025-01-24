'use client';
import React from 'react';
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
import { useImagesLoader } from '@/lib/hooks/imageHook/useImagesLoader';
import RPictureCardSkeleton from '../RPictureCardSkeleton/RPictureCardSkeleton';

export interface RPictureCardProps {
  picture: Picture;
}
const RPictureCard = ({ picture }: RPictureCardProps) => {
  const isLoading = useImagesLoader(picture);

  return (
    <>
      {isLoading ? (
        <RPictureCardSkeleton />
      ) : (
        <Card className={cn('border-none shadow-none cursor-pointer')}>
          <CardHeader className="px-0">
            <CardTitle className="relative">
              <Image
                className="rounded-md w-full"
                src={picture.download_url}
                alt={picture.author}
                width={300}
                height={500}
              />
              <Heart
                className="absolute top-2 right-2 hover:scale-110  transition-all"
                color="white"
                fill="text-heart"
              />
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
      )}
    </>
  );
};

export default RPictureCard;
