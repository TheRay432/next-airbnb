'use client';

import React, { useEffect, useState } from 'react';
import { Picture } from './PictureList';
import { cn } from '@/lib/utils';
import RPictureCard from '@/components/Custom/RPictureCard/RPictureCard';
import { Button } from '@/components/ui/button';
import InfiniteScroll from 'react-infinite-scroll-component';
import RPictureCardSkeleton from '@/components/Custom/RPictureCardSkeleton/RPictureCardSkeleton';

interface PictureContainerProps {
  pictures: Picture[];
}
const PictureContainer = ({ pictures }: PictureContainerProps) => {
  const [showMore, setShowMore] = useState(false);
  const [morePicturesData, setMorePicturesData] = useState<Picture[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const handleShowMore = () => {
    setShowMore(true);
    fetchMoreData();
  };

  const fetchMoreData = async () => {
    const res = await fetch('https://picsum.photos/v2/list', {
      cache: 'no-store',
    });
    const pictures: Picture[] = await res.json();
    setMorePicturesData((prev) => [...prev, ...pictures]);
  };

  useEffect(() => {
    if (morePicturesData.length >= 120) {
      setHasMore(false);
    }
  }, [morePicturesData]);

  const renderMorePictures = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 gap-y-10">
      {morePicturesData.map((morePicture, index) => (
        <div key={morePicture.id + index} className={cn('w-full')}>
          <RPictureCard picture={morePicture} isHaveTab={index % 2 === 0} />
        </div>
      ))}
    </div>
  );
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 gap-y-10">
        {pictures.length > 0 &&
          pictures.map((picture, index) => (
            <div key={picture.id} className={cn('w-full')}>
              <RPictureCard picture={picture} isHaveTab={index % 2 === 0} />
            </div>
          ))}
      </div>
      {!showMore && (
        <div className="w-full flex flex-col items-center my-6 gap-y-3">
          <h2 className="mt-4">繼續瀏覽島嶼</h2>
          <Button variant="moreBtn" onClick={handleShowMore}>
            顯示更多
          </Button>
        </div>
      )}
      {showMore && (
        <InfiniteScroll
          dataLength={morePicturesData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<RPictureCardSkeleton />}
          scrollThreshold={0.75}
          endMessage={<h4 className="text-center mt-10">沒有更多資料了</h4>}
        >
          {renderMorePictures}
        </InfiniteScroll>
      )}
    </>
  );
};

export default PictureContainer;
