import { isBefore, isValid, parse, startOfDay } from 'date-fns';
export const DATE_FORMAT = 'yyyyMMdd';

type SearchParams = Record<string, string | string[] | undefined>;

type StayParam = {
  key: string;
  value: string | undefined;
};

export const parseDate = (value: string | null | undefined) => {
  if (!value || !/^\d{8}$/.test(value)) return undefined;
  const parsed = parse(value, DATE_FORMAT, new Date());
  return isValid(parsed) ? startOfDay(parsed) : undefined;
};

const getParam = (searchParams: SearchParams, key: string) => {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
};

const isParamValid = ({ key, value }: StayParam, params: StayParam[]) => {
  if (value === undefined) return true;

  let isValidParam = false;
  switch (key) {
    case 'checkin': {
      const checkin = parseDate(value);
      isValidParam = !!checkin && !isBefore(checkin, startOfDay(new Date()));
      break;
    }
    case 'checkout': {
      const checkin = parseDate(params.find((param) => param.key === 'checkin')?.value);
      const checkout = parseDate(value);
      isValidParam = !!checkin && !!checkout && isBefore(checkin, checkout);
      break;
    }
    default:
      isValidParam = /^\d+$/.test(value);
  }
  return isValidParam;
};

/** 檢查所有參數是否有效 */
const isAllParamsValid = (params: StayParam[], isParamValid: (param: StayParam, params: StayParam[]) => boolean) => {
  return params.every((param) => isParamValid(param, params));
};

/** 檢查url參數 */
export const isValidStayParams = (searchParams: SearchParams) => {
  const STAY_PARAM_KEYS: StayParam[] = [
    { key: 'checkin', value: getParam(searchParams, 'checkin') },
    { key: 'checkout', value: getParam(searchParams, 'checkout') },
    { key: 'adults', value: getParam(searchParams, 'adults') },
    { key: 'children', value: getParam(searchParams, 'children') },
    { key: 'infants', value: getParam(searchParams, 'infants') },
  ];

  return isAllParamsValid(STAY_PARAM_KEYS, isParamValid);
};
