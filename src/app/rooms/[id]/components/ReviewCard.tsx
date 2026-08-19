import React from 'react';
import Image from 'next/image';
import { RoomReview } from '@/lib/constant/rooms';
import { BLUR_DATA_URL } from '@/lib/utils';

interface ReviewCardProps {
  review: RoomReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Image
          className="rounded-full object-cover"
          src={review.avatar}
          alt={review.name}
          width={44}
          height={44}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div>
          <h3 className="text-sm font-semibold">{review.name}</h3>
          <p className="text-xs text-darkgray">{review.from}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-darkgray">{review.date}</p>
      <p className="mt-2 text-sm leading-6">{review.content}</p>
    </div>
  );
};

export default ReviewCard;
