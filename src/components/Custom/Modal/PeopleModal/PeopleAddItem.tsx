import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import { PeopleList, PeopleObj } from "./PeopleModal";

interface PeopleAddItemProps {
  className?: string;
  peopleListitem: PeopleList;
  peopleObj: PeopleObj;
  setPeopleObj: (peopleObj: PeopleObj) => void;
}

const PeopleAddItem = ({ peopleListitem, className, peopleObj, setPeopleObj }: PeopleAddItemProps) => {
  const count = peopleObj[peopleListitem.type];

  const handleCount = (selectType: 'plus' | 'minus') => {
    if (selectType === 'plus') {
      setPeopleObj({ ...peopleObj, [peopleListitem.type]: count + 1 });
    } else {
      setPeopleObj({ ...peopleObj, [peopleListitem.type]: count - 1 });
    }
  }
  return (
    <div className={cn("flex justify-between", className)}>
      <div>
        <h3 className="mb-1">{peopleListitem.title}</h3>
        <p className="text-sm text-gray-500">{peopleListitem.description}</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full w-8 h-8 border-darkgray" disabled={count === 0} onClick={() => handleCount('minus')}>
          <Minus color="#6A6A6A" size={14} />
        </Button>
        <h3>{count}</h3>
        <Button variant="outline" size="icon" className="rounded-full w-8 h-8 border-darkgray" onClick={() => handleCount('plus')}>
          <Plus color="#6A6A6A" size={14} />
        </Button>
      </div>
    </div>
  );
};

export default PeopleAddItem;
