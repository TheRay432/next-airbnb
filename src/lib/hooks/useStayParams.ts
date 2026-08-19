'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import {
  differenceInCalendarDays,
  format,
  isValid,
  parseISO,
  startOfDay,
} from 'date-fns';
import { PeopleObj } from '@/components/Custom/Modal/PeopleModal/PeopleModal';

const DATE_FORMAT = 'yyyy-MM-dd';

const parseDate = (value: string | null) => {
  if (!value) return undefined;
  const parsed = parseISO(value);
  return isValid(parsed) ? startOfDay(parsed) : undefined;
};

const parseCount = (value: string | null, fallback: number) => {
  if (value === null) return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

export const getNights = (date: DateRange | undefined) =>
  date?.from && date?.to ? differenceInCalendarDays(date.to, date.from) : 0;

/** 入住日期與人數以網址為唯一資料來源，重新整理或分享連結都能還原 */
export const useStayParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const date = useMemo<DateRange | undefined>(() => {
    const from = parseDate(searchParams.get('checkIn'));
    if (!from) return undefined;
    return { from, to: parseDate(searchParams.get('checkOut')) };
  }, [searchParams]);

  const peopleObj = useMemo<PeopleObj>(
    () => ({
      adult: parseCount(searchParams.get('adults'), 1),
      child: parseCount(searchParams.get('children'), 0),
      baby: parseCount(searchParams.get('infants'), 0),
    }),
    [searchParams],
  );

  // 用 replace 不留歷史紀錄，避免上一頁被篩選條件灌爆
  const commit = useCallback(
    (next: URLSearchParams) => {
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const setDate = useCallback(
    (next: DateRange | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next?.from) params.set('checkIn', format(next.from, DATE_FORMAT));
      else params.delete('checkIn');
      if (next?.to) params.set('checkOut', format(next.to, DATE_FORMAT));
      else params.delete('checkOut');
      commit(params);
    },
    [commit, searchParams],
  );

  const setPeopleObj = useCallback(
    (next: PeopleObj) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('adults', String(next.adult));
      params.set('children', String(next.child));
      params.set('infants', String(next.baby));
      commit(params);
    },
    [commit, searchParams],
  );

  return { date, setDate, peopleObj, setPeopleObj };
};
