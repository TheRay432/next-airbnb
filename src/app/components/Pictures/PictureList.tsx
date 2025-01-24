'use client';
import RPictureCard from '@/components/Custom/RPictureCard/RPictureCard';
import RPictureCardSkeleton from "@/components/Custom/RPictureCardSkeleton/RPictureCardSkeleton";
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

export interface Picture {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
const PictureList = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch('https://picsum.photos/v2/list');
    const data = await res.json();
    setPictures(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full px-10 xl:px-20 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 gap-y-10">
        {isLoading ? (
          <>
            {new Array(30).fill(0).map((_, index) => (
              <RPictureCardSkeleton key={index} />
            ))}
          </>
        ) : (
          pictures.map((picture) => (
            <div key={picture.id} className={cn('w-full')}>
            <RPictureCard picture={picture} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PictureList;
