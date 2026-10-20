import { isBefore, isValid, parse, startOfDay } from 'date-fns';

export const DATE_FORMAT = 'yyyyMMdd';

export const parseDate = (value: string | null) => {
  if (!value || !/^\d{8}$/.test(value)) return undefined;
  const parsed = parse(value, DATE_FORMAT, new Date());
  return isValid(parsed) ? startOfDay(parsed) : undefined;
};

type SearchParams = Record<string, string | string[] | undefined>;

/** 只檢查自己用的參數，其他參數（如追蹤碼）一律忽略 */
export const isValidStayParams = (searchParams: SearchParams) => {
  const get = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const rawCheckin = get('checkin');
  const rawCheckout = get('checkout');
  const checkin = rawCheckin === undefined ? undefined : parseDate(rawCheckin);
  const checkout = rawCheckout === undefined ? undefined : parseDate(rawCheckout);

  if (rawCheckin !== undefined && !checkin) return false;
  if (rawCheckout !== undefined && !checkout) return false;
  if (checkin && isBefore(checkin, startOfDay(new Date()))) return false;
  if (checkout && (!checkin || !isBefore(checkin, checkout))) return false;

  return ['adults', 'children', 'infants'].every((key) => {
    const value = get(key);
    return value === undefined || /^\d+$/.test(value);
  });
};
