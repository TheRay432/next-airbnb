import React from 'react';
import { Star } from 'lucide-react';
import { REVIEW_PREVIEW_COUNT, Room, RoomReview } from '@/lib/constant/rooms';
import ReviewCard from './ReviewCard';
import RoomReviewsModal from './RoomReviewsModal';

interface RoomReviewsProps {
  room: Room;
  ratingScores: { label: string; score: number }[];
  allReviews: RoomReview[];
}

const RoomReviews = ({ room, ratingScores, allReviews }: RoomReviewsProps) => {
  return (
    <div className="py-8 border-t border-lightgray">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        <Star size={18} fill="currentColor" />
        {room.rating}・{allReviews.length} 則評價
      </h2>
      {/* 分項評分 */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
        {ratingScores.map((item) => (
          <div key={item.label} className="flex items-center gap-4">
            <p className="w-20 text-sm shrink-0">{item.label}</p>
            <div className="grow h-1 bg-lightgray rounded-full">
              <div
                className="h-1 bg-moreBtn rounded-full"
                style={{ width: `${(item.score / 5) * 100}%` }}
              />
            </div>
            <p className="w-8 text-sm text-right shrink-0">{item.score}</p>
          </div>
        ))}
      </div>
      {/* 評論列表 */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {allReviews.slice(0, REVIEW_PREVIEW_COUNT).map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
      {allReviews.length > REVIEW_PREVIEW_COUNT && (
        <RoomReviewsModal rating={room.rating} reviews={allReviews} />
      )}
    </div>
  );
};

export default RoomReviews;
