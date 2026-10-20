'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { differenceInCalendarDays, format } from 'date-fns';
import { PeopleObj } from '@/components/Custom/Modal/PeopleModal/PeopleModal';
import { DATE_FORMAT, parseDate } from '@/lib/stayParams';

interface SearchQuery {
  placeId?: string;
  date?: DateRange;
  peopleObj: PeopleObj;
}

/** 搜尋列送出用，沒填的條件不帶 */
export const buildSearchQuery = ({ placeId, date, peopleObj }: SearchQuery) => {
  const params = new URLSearchParams();
  if (placeId) params.set('place_id', placeId);
  if (date?.from) params.set('checkin', format(date.from, DATE_FORMAT));
  if (date?.to) params.set('checkout', format(date.to, DATE_FORMAT));
  if (peopleObj.adult + peopleObj.child + peopleObj.baby > 0) {
    params.set('adults', String(peopleObj.adult));
    params.set('children', String(peopleObj.child));
    params.set('infants', String(peopleObj.baby));
  }
  return params.toString();
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
    const from = parseDate(searchParams.get('checkin'));
    if (!from) return undefined;
    return { from, to: parseDate(searchParams.get('checkout')) };
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
      if (next?.from) params.set('checkin', format(next.from, DATE_FORMAT));
      else params.delete('checkin');
      if (next?.to) params.set('checkout', format(next.to, DATE_FORMAT));
      else params.delete('checkout');
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

  const placeId = searchParams.get('place_id') ?? undefined;
  // 網址沒帶人數時，搜尋列顯示「新增人數」而不是預設的 1 位成人
  const hasPeople = searchParams.has('adults');

  return { date, setDate, peopleObj, setPeopleObj, placeId, hasPeople };
};
