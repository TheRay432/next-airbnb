'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin } from 'lucide-react';
import React from 'react';
import { LocationItem } from '@/types/location';

interface LocationModalProps {
  isOpenLocation: boolean;
  setIsOpenLocation: (isOpen: boolean) => void;
  onSelect: (title: string) => void;
  locationList: LocationItem[];
}

const LocationModal = ({
  isOpenLocation,
  setIsOpenLocation,
  onSelect,
  locationList,
}: LocationModalProps) => {
  const handleSelect = (title: string) => {
    onSelect(title);
    setIsOpenLocation(false);
  };

  return (
    <Popover open={isOpenLocation} onOpenChange={(open) => setIsOpenLocation(open)}>
      <PopoverTrigger asChild>
        <div></div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[425px] rounded-4xl p-6"
        align="start"
        // 保留 input 的焦點，讓使用者可以繼續輸入
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <p className="px-4 pb-2 text-xs">推薦目的地</p>
        <div className="custom-scrollbar max-h-[420px] overflow-y-auto pr-2">
          {locationList.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-hovergray cursor-pointer"
              onClick={() => handleSelect(item.title)}
            >
              <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-xl bg-white border border-lightgray">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm">{item.title}</span>
                <span className="text-sm text-muted-foreground">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationModal;
