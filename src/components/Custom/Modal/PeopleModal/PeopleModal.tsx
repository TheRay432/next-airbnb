'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React from 'react';
import PeopleAddItem from './PeopleAddItem';

interface PeopleModalProps {
  isOpenPeople: boolean;
  setIsOpenPeople: (isOpen: boolean) => void;
  peopleObj: PeopleObj;
  setPeopleObj: (peopleObj: PeopleObj) => void;
}

export interface PeopleList {
  title: string;
  description: string;
  type: keyof PeopleObj;
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

const PeopleModal = ({
  isOpenPeople,
  setIsOpenPeople,
  peopleObj,
  setPeopleObj,
}: PeopleModalProps) => {
  return (
    <>
      <Popover open={isOpenPeople} onOpenChange={(open) => setIsOpenPeople(open)}>
        <PopoverTrigger asChild>
          <div></div>
        </PopoverTrigger>
        <PopoverContent className="w-96 rounded-4xl" align="end">
          <div className="p-4 divide-y divide-lightgray">
            {peopleList.map((item) => (
              <PeopleAddItem
                className="py-6 first:pt-0 last:pb-0"
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
