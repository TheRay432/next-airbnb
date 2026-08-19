'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DateRangePicker from '@/components/Custom/DateRangePicker/DateRangePicker';
import PeopleModal from '@/components/Custom/Modal/PeopleModal/PeopleModal';
import {
  CLEANING_FEE,
  Room,
  ROOM_SECTION,
  SERVICE_FEE,
} from '@/lib/constant/rooms';
import { formatPrice } from '@/lib/utils';
import { getNights, useStayParams } from '@/lib/hooks/useStayParams';

interface RoomBookingProps {
  room: Room;
}

const RoomBooking = ({ room }: RoomBookingProps) => {
  const { date, setDate, peopleObj, setPeopleObj } = useStayParams();
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isOpenPeople, setIsOpenPeople] = useState(false);
  const [selectType, setSelectType] = useState<'start' | 'end'>('start');
  // 人數加減走本地草稿，關閉 modal 才寫回網址，避免每次點擊都打一次 RSC
  const [draftPeople, setDraftPeople] = useState(peopleObj);

  // 網址變動（含上一頁／下一頁）時同步草稿
  useEffect(() => {
    setDraftPeople(peopleObj);
  }, [peopleObj]);

  const nights = getNights(date);
  const subtotal = room.price * nights;
  const total = nights > 0 ? subtotal + CLEANING_FEE + SERVICE_FEE : 0;

  const handleChooseDate = (type: 'start' | 'end') => {
    setSelectType(type);
    setIsOpenDate(true);
  };

  const formatDate = (value: Date | undefined) =>
    value ? format(value, 'yyyy/M/d', { locale: zhTW }) : '選擇日期';

  // 關閉 modal 時才把草稿寫回網址
  const handleTogglePeople = (open: boolean) => {
    if (!open) {
      setPeopleObj(draftPeople);
    }
    setIsOpenPeople(open);
  };

  const guestLabel = [
    `${draftPeople.adult + draftPeople.child} 位房客`,
    draftPeople.baby > 0 ? `${draftPeople.baby} 位嬰兒` : '',
  ]
    .filter(Boolean)
    .join('、');

  const feeRows = [
    { label: `${formatPrice(room.price)} TWD x ${nights} 晚`, value: subtotal },
    { label: '清潔費', value: CLEANING_FEE },
    { label: '服務費', value: SERVICE_FEE },
  ];

  return (
    <>
      {/* 桌機版：右側 sticky 訂房卡 */}
      <aside id={ROOM_SECTION.booking} className="hidden lg:block w-5/12">
        <div className="sticky top-32 py-8">
          <div className="border border-lightgray rounded-xl shadow-lg p-6">
            <p>
              <span className="text-xl font-bold">
                {formatPrice(room.price)} TWD
              </span>
              <span className="text-sm text-darkgray"> /晚</span>
            </p>
            <div className="relative mt-4">
              <div className="border border-lightgray rounded-lg">
                <div className="flex">
                  <div
                    className="w-1/2 p-3 border-r border-lightgray cursor-pointer"
                    onClick={() => handleChooseDate('start')}
                  >
                    <p className="text-[10px] font-bold">入住</p>
                    <p className="text-sm">{formatDate(date?.from)}</p>
                  </div>
                  <div
                    className="w-1/2 p-3 cursor-pointer"
                    onClick={() => handleChooseDate('end')}
                  >
                    <p className="text-[10px] font-bold">退房</p>
                    <p className="text-sm">{formatDate(date?.to)}</p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-3 border-t border-lightgray cursor-pointer"
                  onClick={() => setIsOpenPeople(true)}
                >
                  <div>
                    <p className="text-[10px] font-bold">房客</p>
                    <p className="text-sm">{guestLabel}</p>
                  </div>
                  <ChevronDown size={16} />
                </div>
              </div>
              {/* 日曆的錨點，靠右撐開寬度讓兩個月排得下 */}
              <div className="absolute right-0 top-full w-[640px]">
                <DateRangePicker
                  isOpen={isOpenDate}
                  setIsOpen={setIsOpenDate}
                  type={selectType}
                  date={date}
                  setDate={setDate}
                />
              </div>
              <PeopleModal
                isOpenPeople={isOpenPeople}
                setIsOpenPeople={handleTogglePeople}
                peopleObj={draftPeople}
                setPeopleObj={setDraftPeople}
              />
            </div>
            <Button className="w-full h-12 mt-4 rounded-lg bg-lightPrimary hover:bg-darkPrimary text-base">
              預訂
            </Button>
            {nights > 0 && (
              <>
                <p className="mt-4 text-center text-sm text-darkgray">
                  你目前不會被收費
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {feeRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between text-sm"
                    >
                      <p className="underline">{row.label}</p>
                      <p>{formatPrice(row.value)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-lightgray flex justify-between font-bold">
                  <p>總計 TWD</p>
                  <p>{formatPrice(total)}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
      {/* 手機版：底部固定列 */}
      <div className="lg:hidden fixed left-0 right-[var(--removed-body-scroll-bar-size,0px)] bottom-0 z-20 flex items-center justify-between gap-4 px-6 py-3 bg-white border-t border-lightgray">
        <div>
          <p className="text-sm">
            <span className="font-bold">{formatPrice(room.price)} TWD</span>
            <span className="text-darkgray"> /晚</span>
          </p>
          <p className="text-xs text-darkgray">
            {nights > 0
              ? `${formatDate(date?.from)} - ${formatDate(date?.to)}・總計 ${formatPrice(total)}`
              : '尚未選擇日期'}
          </p>
        </div>
        <Button className="h-11 px-6 rounded-lg bg-lightPrimary hover:bg-darkPrimary">
          預訂
        </Button>
      </div>
    </>
  );
};

export default RoomBooking;
