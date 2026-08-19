"use client"
import * as React from "react"
import { Day } from "date-fns"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { zhTW } from 'date-fns/locale'
import { useState, useEffect } from "react";

export const formatters = {
  formatCaption: (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}年${month}月`;
  }
};

export const customLocale = {
  ...zhTW,
  options: {
    ...zhTW.options,
    weekStartsOn: 0 as Day  // 0 表示星期日，1 表示星期一
  }
};

interface DateRangePickerProps {    
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: "start" | "end";
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

const DateRangePicker = ({ isOpen, setIsOpen, type="start", date, setDate }: DateRangePickerProps) => {
  const [selectType, setSelectType] = useState<"start" | "end">("start");
  const [openType, setOpenType] = useState<"start" | "end">("start");


  // 處理日期選擇
  const handleSelect = (selectedDate: DateRange | undefined, day: Date) => {
    if (openType === "start" && selectType === "start") {
      if(date?.to && day > date?.to) {
        setDate({ from: day, to: undefined });
        setSelectType("end");
        return;
      }
      setDate({ ...date, from: day });
      setSelectType("end");
    }
    else if (openType === 'start' && selectType === 'end') {
      if(date?.from && day < date?.from) {
        setDate({ from: day, to: undefined });
        return;
      }
      setDate({ from: date?.from, to: day });
    }
    else if (openType === 'end' && selectType === 'start') {
      setDate({ from: day, to: date?.to });
      setSelectType("end");
    }
    else if (openType === 'end' && selectType === 'end') {
      if(date?.from && day < date?.from) {
        setDate({ from: day, to: undefined });
        return;
      }
      setDate({ from: date?.from, to: day });
      if (!date?.from) {
        setSelectType("start");
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      setSelectType(type);
      setOpenType(type)
    }
  }, [type, isOpen]);

  return (
    <div>
      {/* 彈出的日曆選擇器 */}
      <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger asChild>
          <div></div>
        </PopoverTrigger>
        <PopoverContent className="min-w-[--radix-popover-trigger-width] p-0 rounded-4xl" align="start" sideOffset={5}>
          <div className="overflow-x-auto">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from || new Date()}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={2}
              locale={customLocale}
              showOutsideDays={false}
              formatters={formatters}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
export default DateRangePicker;