import {
  AirVent,
  Car,
  CalendarCheck,
  Cctv,
  Coffee,
  Dog,
  DoorOpen,
  Dumbbell,
  Flame,
  MapPin,
  Microwave,
  Refrigerator,
  ShowerHead,
  Snowflake,
  TreePine,
  Tv,
  Utensils,
  Waves,
  Wifi,
  type LucideIcon,
} from 'lucide-react';

/** 費用明細用的全域固定金額（TWD） */
export const CLEANING_FEE = 1200;
export const SERVICE_FEE = 980;

/** 詳情頁評價區直接列出的筆數，超過就出「顯示全部」按鈕 */
export const REVIEW_PREVIEW_COUNT = 6;

/** 詳情頁各區塊的錨點 id，導覽列靠這些 id 做定位與捲動 */
export const ROOM_SECTION = {
  gallery: 'room-gallery',
  amenities: 'room-amenities',
  calendar: 'room-calendar',
  reviews: 'room-reviews',
  booking: 'room-booking',
};

/** 設施的 icon 名稱對應的 lucide 元件 */
export const amenityIcons: Record<string, LucideIcon> = {
  Wifi,
  Tv,
  AirVent,
  Utensils,
  Refrigerator,
  Microwave,
  Coffee,
  ShowerHead,
  Car,
  Waves,
  TreePine,
  Flame,
  Dumbbell,
  Snowflake,
  Dog,
  Cctv,
};

export const highlights = [
  {
    icon: DoorOpen,
    title: '自助入住',
    description: '用密碼鎖自行入住，不用等房東。',
  },
  {
    icon: MapPin,
    title: '絕佳位置',
    description: '最近 90% 的房客給了五星位置評分。',
  },
  {
    icon: CalendarCheck,
    title: '免費取消',
    description: '入住前 5 天以前取消，全額退款。',
  },
];

/** 分項評分與總評分的固定差值 */
export const ratingCategories = [
  { label: '清潔度', offset: 0.06 },
  { label: '準確度', offset: -0.04 },
  { label: '入住', offset: 0.1 },
  { label: '溝通', offset: 0.02 },
  { label: '位置', offset: -0.08 },
  { label: '超值程度', offset: -0.12 },
];
