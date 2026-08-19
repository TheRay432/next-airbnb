'use client';

import React from 'react';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  customLocale,
  formatters,
} from '@/components/Custom/DateRangePicker/DateRangePicker';
import { getNights, useStayParams } from '@/lib/hooks/useStayParams';

const RoomCalendar = () => {
  const { date, setDate } = useStayParams();
  const nights = getNights(date);

  const formatDate = (value: Date | undefined) =>
    value ? format(value, 'yyyy年M月d日', { locale: zhTW }) : '選擇日期';

  return (
    <div className="py-8 border-t border-lightgray">
      <h2 className="text-xl font-semibold">
        {nights > 0 ? `在此住宿 ${nights} 晚` : '選擇入住日期'}
      </h2>
      <p className="mt-1 text-sm text-darkgray">
        {formatDate(date?.from)} - {formatDate(date?.to)}
      </p>
      <div className="mt-4 overflow-x-auto">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          locale={customLocale}
          showOutsideDays={false}
          formatters={formatters}
        />
      </div>
    </div>
  );
};

export default RoomCalendar;
