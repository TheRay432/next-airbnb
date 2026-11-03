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
import RBottomSheet from '@/components/Custom/RBottomSheet/RBottomSheet';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import { RoomReview } from '@/types/room';
import ReviewCard from './ReviewCard';

const PAGE_SIZE = 8;
const SCROLL_TARGET_ID = 'roomReviewsScrollArea';

interface RoomReviewsModalProps {
  rating: number;
  reviews: RoomReview[];
}

const RoomReviewsModal = ({ rating, reviews }: RoomReviewsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
  const isDesktop = useIsDesktop();
  const hasMore = loadedCount < reviews.length;

  const fetchMoreData = () => {
    setLoadedCount((prev) => Math.min(prev + PAGE_SIZE, reviews.length));
  };

  // 在開啟時重置，關閉時重置會讓列表在離場動畫途中縮短
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setLoadedCount(PAGE_SIZE);
    }
  };

  const trigger = (
    <Button
      variant="outline"
      className="h-12 px-6 mt-10 rounded-lg border-moreBtn bg-footer hover:bg-hovergray"
    >
      顯示全部 {reviews.length} 則評價
    </Button>
  );

  const title = (
    <>
      <Star size={18} fill="currentColor" />
      {rating}・{reviews.length} 則評價
    </>
  );

  const reviewList = (
    <InfiniteScroll
      dataLength={loadedCount}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p className="text-center mt-6 text-sm">載入中…</p>}
      scrollThreshold={0.65}
      scrollableTarget={SCROLL_TARGET_ID}
      endMessage={<h4 className="text-center mt-10">沒有更多評價了</h4>}
      hasChildren
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {reviews.slice(0, loadedCount).map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
    </InfiniteScroll>
  );

  // 兩種版型只能渲染一種，否則會有兩層遮罩
  if (!isDesktop) {
    return (
      <RBottomSheet open={isOpen} onOpenChange={handleOpenChange} trigger={trigger} title={title}>
        <div id={SCROLL_TARGET_ID} className="flex-1 min-h-0 overflow-y-auto p-6">
          {reviewList}
        </div>
      </RBottomSheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="flex flex-col max-w-3xl p-0 gap-0 rounded-xl sm:rounded-xl overflow-hidden"
        aria-describedby={undefined}
      >
        <DialogTitle className="flex items-center gap-2 p-6 border-b border-lightgray">
          {title}
        </DialogTitle>
        <div id={SCROLL_TARGET_ID} className="max-h-[60vh] overflow-y-auto p-6">
          {reviewList}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomReviewsModal;
