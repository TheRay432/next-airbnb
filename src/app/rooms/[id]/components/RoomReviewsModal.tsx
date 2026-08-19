'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RoomReview } from '@/lib/constant/rooms';
import ReviewCard from './ReviewCard';

const PAGE_SIZE = 8;
const SCROLL_TARGET_ID = 'roomReviewsScrollArea';

interface RoomReviewsModalProps {
  rating: number;
  reviews: RoomReview[];
}

const RoomReviewsModal = ({ rating, reviews }: RoomReviewsModalProps) => {
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
  const hasMore = loadedCount < reviews.length;

  const fetchMoreData = () => {
    setLoadedCount((prev) => Math.min(prev + PAGE_SIZE, reviews.length));
  };

  // 在開啟時重置，關閉時重置會讓列表在離場動畫途中縮短
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setLoadedCount(PAGE_SIZE);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-12 px-6 mt-10 rounded-lg border-moreBtn bg-footer hover:bg-hovergray"
        >
          顯示全部 {reviews.length} 則評價
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col max-w-3xl p-0 gap-0 rounded-xl sm:rounded-xl overflow-hidden"
        aria-describedby={undefined}
      >
        <DialogTitle className="flex items-center gap-2 p-6 border-b border-lightgray">
          <Star size={18} fill="currentColor" />
          {rating}・{reviews.length} 則評價
        </DialogTitle>
        <div id={SCROLL_TARGET_ID} className="max-h-[60vh] overflow-y-auto p-6">
          <InfiniteScroll
            dataLength={loadedCount}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<p className="text-center mt-6 text-sm">載入中…</p>}
            scrollThreshold={0.65}
            scrollableTarget={SCROLL_TARGET_ID}
            endMessage={<h4 className="text-center mt-10">沒有更多評價了</h4>}
            // children 是單一 div 而非陣列，不明講的話套件會判定沒有內容而一直顯示 loader
            hasChildren
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {reviews.slice(0, loadedCount).map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomReviewsModal;
