import { createStore } from 'zustand/vanilla';
import { DateRange } from 'react-day-picker';
import { addDays, differenceInCalendarDays, startOfDay } from 'date-fns';
import { PeopleObj } from '@/components/Custom/Modal/PeopleModal/PeopleModal';

/** 預設帶入今天+7 起、住 5 晚 */
const DEFAULT_START_OFFSET = 7;
const DEFAULT_NIGHTS = 5;

export type StayState = {
  date: DateRange | undefined;
  peopleObj: PeopleObj;
};

export type StayActions = {
  setDate: (date: DateRange | undefined) => void;
  setPeopleObj: (peopleObj: PeopleObj) => void;
};

export type StayStore = StayState & StayActions;

/**
 * 今天+7 起住 5 晚。含 new Date()，server 與 client 的時區／時刻不一致，
 * 拿來當初始值會造成 hydration mismatch，所以只在使用者互動時呼叫。
 */
export const getDefaultDateRange = (): DateRange => {
  const from = addDays(startOfDay(new Date()), DEFAULT_START_OFFSET);
  return { from, to: addDays(from, DEFAULT_NIGHTS) };
};

// 初始狀態必須是 server／client 都算得出同一份的常數
export const defaultInitState: StayState = {
  date: undefined,
  peopleObj: { adult: 1, child: 0, baby: 0 },
};

export const createStayStore = (initState: StayState = defaultInitState) => {
  return createStore<StayStore>()((set) => ({
    ...initState,
    setDate: (date) => set({ date }),
    setPeopleObj: (peopleObj) => set({ peopleObj }),
  }));
};

export const getNights = (date: DateRange | undefined) =>
  date?.from && date?.to ? differenceInCalendarDays(date.to, date.from) : 0;
