'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useState } from 'react';
import PeopleAddItem from './PeopleAddItem';
import { cn } from '@/lib/utils';

interface PeopleModalProps {
  isOpenPeople: boolean;
  setIsOpenPeople: (isOpen: boolean) => void;
}

export interface PeopleList {
  title: string;
  description: string;
  type: string;
}

const peopleList: PeopleList[] = [
  {
    title: '成人',
    description: '年滿13歲',
    type: 'adult',
  },
  {
    title: '兒童',
    description: '2-12歲',
    type: 'child',
  },
  {
    title: '嬰兒',
    description: '2歲以下',
    type: 'baby',
  },
];

export interface PeopleObj {
  adult: number;
  child: number;
  baby: number;
}

const PeopleModal = ({ isOpenPeople, setIsOpenPeople }: PeopleModalProps) => {
  const [peopleObj, setPeopleObj] = useState<PeopleObj>({
    adult: 0,
    child: 0,
    baby: 0,
  });

  return (
    <>
      <Popover open={isOpenPeople} onOpenChange={(open) => setIsOpenPeople(open)}>
        <PopoverTrigger asChild>
          <div></div>
        </PopoverTrigger>
        <PopoverContent className="w-96 rounded-4xl" align="end">
          <div className="p-4">
            {peopleList.map((item) => (
              <PeopleAddItem
                className={cn('border-b border-lightgray py-6', {
                  'border-b-0 pb-0': item === peopleList[peopleList.length - 1],
                  'pt-0': item === peopleList[0],
                })}
                key={item.type}
                peopleListitem={item}
                setPeopleObj={setPeopleObj}
                peopleObj={peopleObj}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PeopleModal;
