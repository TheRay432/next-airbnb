'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import SearchBarIcon from './SearchBarIcon';
import DateRangePicker from '@/components/Custom/DateRangePicker/DateRangePicker';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import PeopleModal, { PeopleObj } from "@/components/Custom/Modal/PeopleModal/PeopleModal";
import LocationModal from '@/components/Custom/Modal/LocationModal/LocationModal';
import { useRouter } from 'next/navigation';
import { buildSearchQuery, useStayParams } from '@/lib/hooks/useStayParams';
import { locationList } from '@/lib/constant/location';

interface SearchbarProps {
  isTop: boolean;
  setIsTop: (isTop: boolean) => void;
}

// 兩層常駐 DOM，只用 transform + opacity 交叉切換（不動寬高、不重新掛載），動畫交給 GPU 才會順
// transform 走較長的減速曲線，opacity 較短，讓被縮放的那層先淡掉，看不出文字變形
const layerTransition =
  '[transition:transform_300ms_cubic-bezier(0.2,0,0,1),opacity_200ms_ease,visibility_300ms]';

const Searchbar = ({ isTop, setIsTop }: SearchbarProps) => {
  const router = useRouter();
  // 搜尋條件以網址為初始值，送出前只在搜尋列內暫存
  const stayParams = useStayParams();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPeople, setIsOpenPeople] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [location, setLocation] = useState(
    () => locationList.find((item) => item.id === stayParams.placeId)?.title ?? ''
  );
  const [selectType, setSelectType] = useState<'start' | 'end'>('start');
  const [date, setDate] = useState<DateRange | undefined>(
    stayParams.date ?? { from: undefined, to: undefined }
  );
  const [peopleObj, setPeopleObj] = useState<PeopleObj>(
    stayParams.hasPeople ? stayParams.peopleObj : { adult: 0, child: 0, baby: 0 }
  );
  const searchItemClass =
    'py-2 px-4 flex flex-col w-2/12 h-full rounded-full relative before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:h-8 before:border-lightgray hover:bg-hovergray hover:cursor-pointer';
  const getIsHaveBorder = (itemIndex: number) => {
    return hoveredIndex !== itemIndex - 1 && hoveredIndex !== itemIndex;
  };

  const handleChooseDate = (type: 'start' | 'end') => {
    setSelectType(type);
    setIsOpen(true);
  };

  // 格式化日期顯示
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'M月dd日', { locale: zhTW });
  };

  // 收合版依點擊的欄位展開並打開對應彈窗
  const handleOpenModal = (type: 'location' | 'date' | 'people') => {
    switch (type) {
      case 'location':
        setIsOpenLocation(true);
        break;
      case 'date':
        handleChooseDate('start');
        break;
      case 'people':
        setIsOpenPeople(true);
        break;
    }
    setIsTop(true);
  }

  const handleOpenPeople = () => {
    setIsOpenPeople(true);
  }

  const guestCount = peopleObj.adult + peopleObj.child;
  const peopleText = [
    guestCount > 0 && `${guestCount} 位旅客`,
    peopleObj.baby > 0 && `${peopleObj.baby} 位嬰幼兒`,
  ]
    .filter(Boolean)
    .join(', ');

  const handleSearch = (e: React.MouseEvent) => {
    // 避免冒泡到旅客欄位又把人數彈窗打開
    e.stopPropagation();
    const placeId = locationList.find((item) => item.title === location)?.id;
    const query = buildSearchQuery({ placeId, date, peopleObj });
    setIsOpenPeople(false);
    router.push(query ? `/?${query}` : '/');
  }

  useEffect(() => {
    if (!isTop) {
      setIsOpen(false);
      setIsOpenPeople(false);
      setIsOpenLocation(false);
    }
  }, [isTop]);

  return (
    <div className="w-full hidden md:block max-w-[850px] h-16 absolute bottom-4 left-1/2 -translate-x-1/2">
      {/* 展開版：收合時縮向小搜尋列的位置並淡出 */}
      <div
        className={cn(
          'absolute inset-0 flex items-center bg-white border border-lightgray rounded-full shadow-md origin-center will-change-transform',
          layerTransition,
          {
            'opacity-0 invisible pointer-events-none scale-x-[0.376] scale-y-75 -translate-y-1': !isTop,
          }
        )}
        aria-hidden={!isTop}
      >
        {/* 地點 */}
        <div
          className="py-2 px-8 flex flex-col w-4/12 h-full rounded-full hover:bg-hovergray hover:cursor-pointer"
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setIsOpenLocation(true)}
        >
          <span className="text-xs">地點</span>
          <Input
            className="pl-0 cursor-pointer"
            placeholder="搜尋目的地"
            isNoBorder
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            readOnly
          />
        </div>
        {/* 入住 */}
        <div
          className={cn(searchItemClass, {
            'before:border-l': getIsHaveBorder(1),
          })}
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleChooseDate('start')}
        >
          <span className="text-xs">入住</span>
          <span
            className={cn('text-sm text-muted-foreground py-1', {
              'text-black font-bold': date?.from,
            })}
          >
            {date?.from ? formatDate(date.from) : '選擇日期'}
          </span>
        </div>
        {/* 退房 */}
        <div
          className={cn(searchItemClass, {
            'before:border-l': getIsHaveBorder(2),
          })}
          onMouseEnter={() => setHoveredIndex(2)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleChooseDate('end')}
        >
          <span className="text-xs">退房</span>
          <span
            className={cn('text-sm text-muted-foreground py-1', {
              'text-black font-bold': date?.to,
            })}
          >
            {date?.to ? formatDate(date.to) : '選擇日期'}
          </span>
        </div>
        {/* 旅客 */}
        <div
          className={cn(
            `${searchItemClass} w-4/12 flex-row justify-between items-center relative pr-2`,
            {
              'before:border-l': getIsHaveBorder(3),
            }
          )}
          onMouseEnter={() => setHoveredIndex(3)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={handleOpenPeople}
        >
          <div className="w-7/12 flex flex-col">
            <span className="text-xs">旅客</span>
            <span
              className={cn('text-sm text-muted-foreground py-1 truncate', {
                'text-black font-bold': peopleText,
              })}
            >
              {peopleText || '新增人數'}
            </span>
          </div>
          <SearchBarIcon isTop onClick={handleSearch} />
        </div>
      </div>

      {/* 收合版：展開時放大到大搜尋列的尺寸並淡出 */}
      <div
        className={cn(
          'absolute bottom-3 left-1/2 -translate-x-1/2 w-80 h-12 flex items-center bg-white border border-lightgray rounded-full shadow-md origin-center will-change-transform',
          layerTransition,
          {
            'opacity-0 invisible pointer-events-none scale-x-[2.65] scale-y-[1.33] translate-y-1': isTop,
          }
        )}
        aria-hidden={isTop}
      >
        {/* 地點 */}
        <div className="py-2 pl-6 pr-4 flex w-4/12 flex-col h-full items-center justify-center cursor-pointer" onClick={() => handleOpenModal('location')}>
          <span className="text-sm">任何地方</span>
        </div>
        {/* 時間 */}
        <div className="py-2 px-4 flex w-3/12 flex-col h-full cursor-pointer items-center justify-center relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:border-l before:border-lightgray" onClick={() => handleOpenModal('date')}>
          <span className="text-sm">任一週</span>
        </div>
        {/* 人數 */}
        <div className="py-2 pl-4 pr-2 flex w-5/12 h-full items-center cursor-pointer justify-between relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:border-l before:border-lightgray" onClick={() => handleOpenModal('people')}>
          <span className="text-sm text-gray-500">新增人數</span>
          <SearchBarIcon />
        </div>
      </div>

      {/* 彈窗錨點固定在搜尋列底部，寬度與展開版相同 */}
      <div className="absolute inset-x-0 bottom-0">
        <DateRangePicker
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          type={selectType}
          date={date}
          setDate={setDate}
        />
        <LocationModal
          isOpenLocation={isOpenLocation}
          setIsOpenLocation={setIsOpenLocation}
          onSelect={setLocation}
        />
        <PeopleModal
          isOpenPeople={isOpenPeople}
          setIsOpenPeople={setIsOpenPeople}
          peopleObj={peopleObj}
          setPeopleObj={setPeopleObj}
        />
      </div>
    </div>
  );
};

export default Searchbar;
