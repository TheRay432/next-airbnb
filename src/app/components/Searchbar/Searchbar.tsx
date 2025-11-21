'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import SearchBarIcon from './SearchBarIcon';
import DateRangePicker from '@/components/Custom/DateRangePicker/DateRangePicker';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import PeopleModal from "@/components/Custom/Modal/PeopleModal/PeopleModal";

interface SearchbarProps {
  isTop: boolean;
  setIsTop: (isTop: boolean) => void;
}

const Searchbar = ({ isTop, setIsTop }: SearchbarProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPeople, setIsOpenPeople] = useState(false);
  const [selectType, setSelectType] = useState<'start' | 'end'>('start');
  const [showContent, setShowContent] = useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
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

  const handleOpenModal = () => {
    setIsOpen(true);
    setIsTop(true);
  }

  const handleOpenPeople = () => {
    setIsOpenPeople(true);
  }

  useEffect(() => {
    if (isTop) {
      // 等待寬度過渡完成後再顯示內容
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 150); // 與 transition-all duration-150 同步
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
      setIsOpenPeople(false);
      setShowContent(false);
    }
  }, [isTop]);

  return (
    <div
      className={cn(
        'w-full hidden md:block max-w-[850px] h-16 bg-white border border-lightgray rounded-full shadow-md transition-all duration-150 absolute bottom-4 left-1/2 -translate-x-1/2',
        {
          'max-w-80 h-12': !isTop,
          'bottom-7': !isTop,
        }
      )}
    >
      <div className="flex items-center w-full h-full">
        {isTop && showContent && (
          <>
            {/* 地點 */}
            <div
              className="py-2 px-8 flex flex-col w-4/12 h-full rounded-full hover:bg-hovergray hover:cursor-pointer"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="text-xs">地點</span>
              <Input className="pl-0" placeholder="搜尋目的地" isNoBorder />
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
                <span className="text-sm text-muted-foreground py-1">
                  新增人數
                </span>
              </div>
              <SearchBarIcon isTop={isTop} />
            </div>
          </>
        )}
        {!isTop && (
          <>
            {/* 地點 */}
            <div className="py-2 pl-6 pr-4 flex w-4/12 flex-col h-full items-center justify-center cursor-pointer" onClick={handleOpenModal}>
              <span className="text-sm">任何地方</span>
            </div>
            {/* 時間 */}
            <div className="py-2 px-4 flex w-3/12 flex-col h-full cursor-pointer items-center justify-center relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:border-l before:border-lightgray" onClick={handleOpenModal}>
              <span className="text-sm">任一週</span>
            </div>
            {/* 人數 */}
            <div className="py-2 pl-4 pr-2 flex w-5/12 h-full items-center cursor-pointer justify-between relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:border-l before:border-lightgray" onClick={handleOpenModal}>
              <span className="text-sm text-gray-500">新增人數</span>
              <SearchBarIcon isTop={isTop} />
            </div>
          </>
        )}
      </div>
      <DateRangePicker
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type={selectType}
        date={date}
        setDate={setDate}
      />
      <PeopleModal isOpenPeople={isOpenPeople} setIsOpenPeople={setIsOpenPeople} />
    </div>
  );
};

export default Searchbar;
