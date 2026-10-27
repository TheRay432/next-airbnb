/** 首頁列表用 */
export interface RoomListItem {
  id: number;
  title: string;
  location: string;
  roomType: string;
  images: string[];
  price: number;
  rating: number;
  reviewCount: number;
  isGuestFavorite: boolean;
}

/** 商品頁用 */
export interface Room extends RoomListItem {
  address: string;
  description: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  host: RoomHost;
  amenities: { iconType: string; label: string }[];
  reviews: RoomReview[];
}

/** 商品頁用 */
export interface RoomHost {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  reviewCount: number;
  responseRate: number;
}

/** 商品頁用 */
export interface RoomReview {
  name: string;
  avatar: string;
  from: string;
  date: string;
  content: string;
}
