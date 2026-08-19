'use client';

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';
import {
  CLEANING_FEE,
  Room,
  ROOM_SECTION,
  SERVICE_FEE,
} from '@/lib/constant/rooms';
import { cn, formatPrice } from '@/lib/utils';
import { getNights, useStayParams } from '@/lib/hooks/useStayParams';

/** 導覽列高度，同時當作捲動定位時要扣掉的偏移量 */
const NAV_HEIGHT = 80;

const TABS = [
  { id: ROOM_SECTION.gallery, label: '相片' },
  { id: ROOM_SECTION.amenities, label: '設施' },
  { id: ROOM_SECTION.calendar, label: '供訂日期' },
  { id: ROOM_SECTION.reviews, label: '評價' },
];

interface RoomNavProps {
  room: Room;
}

const RoomNav = ({ room }: RoomNavProps) => {
  const { date } = useStayParams();
  const [isShow, setIsShow] = useState(false);
  const [isShowBooking, setIsShowBooking] = useState(false);

  // 已選日期就改顯示該區間總價，未選則維持每晚單價
  const nights = getNights(date);
  const total = room.price * nights + CLEANING_FEE + SERVICE_FEE;

  useEffect(() => {
    const handleScroll = () => {
      const gallery = document.getElementById(ROOM_SECTION.gallery);
      const booking = document.getElementById(ROOM_SECTION.booking);
      // 相片牆整個捲過去才顯示導覽列
      setIsShow(!!gallery && gallery.getBoundingClientRect().bottom <= 0);
      // 訂房卡不再黏住（區塊底部被導覽列蓋住）才補上價錢與預訂按鈕
      setIsShowBooking(
        !!booking && booking.getBoundingClientRect().bottom <= NAV_HEIGHT,
      );
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn(
        // 彈窗開啟時捲軸被鎖掉，右邊界內縮回補捲軸寬度，避免整條列往右擴張
        'hidden lg:block fixed left-0 right-[var(--removed-body-scroll-bar-size,0px)] top-0 z-30 bg-white border-b border-lightgray transition-transform duration-300',
        isShow ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <BaseCotainer>
        <div className="max-w-[1120px] mx-auto h-20 flex items-center justify-between">
          <nav className="flex items-center gap-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className="h-20 text-sm border-b-2 border-transparent hover:border-black"
                onClick={() => handleScrollTo(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          {isShowBooking && (
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm">
                  <span className="font-bold">
                    {formatPrice(nights > 0 ? total : room.price)} TWD
                  </span>
                  <span className="text-darkgray">
                    {nights > 0 ? ` /${nights} 晚` : ' /晚'}
                  </span>
                </p>
                <p className="flex items-center gap-1 text-xs text-darkgray">
                  <Star size={12} fill="currentColor" />
                  <span>
                    {room.rating}・{room.reviewCount} 則評價
                  </span>
                </p>
              </div>
              <Button className="h-10 px-6 rounded-lg bg-lightPrimary hover:bg-darkPrimary">
                預訂
              </Button>
            </div>
          )}
        </div>
      </BaseCotainer>
    </div>
  );
};

export default RoomNav;
