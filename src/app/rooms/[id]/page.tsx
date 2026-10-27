import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';
import { Check } from 'lucide-react';
import { amenityIcons, ratingCategories, ROOM_SECTION } from '@/lib/constant/rooms';
import { Room } from '@/types/room';
import { LocationItem } from '@/types/location';
import { isValidStayParams } from '@/lib/stayParams';
import RNotFound from '@/components/Custom/RNotFound/RNotFound';
import RoomHeader from './components/RoomHeader';
import RoomGallery from './components/RoomGallery';
import RoomSummary from './components/RoomSummary';
import RoomHost from './components/RoomHost';
import RoomDescription from './components/RoomDescription';
import RoomAmenities from './components/RoomAmenities';
import RoomCalendar from './components/RoomCalendar';
import RoomReviews from './components/RoomReviews';
import RoomBooking from './components/RoomBooking';
import RoomNav from './components/RoomNav';

interface RoomDetailProps {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

const RoomDetail = async ({ params, searchParams }: RoomDetailProps) => {
  // id 不是數字就不必打 API
  if (!/^\d+$/.test(params.id)) {
    notFound();
  }

  // 兩支 API 互不相依，同時發出；房源與地點都很少變動，快取一小時
  const [roomRes, regionsRes] = await Promise.all([
    fetch(`${process.env.API_URL}/api/rooms/${params.id}`, { next: { revalidate: 3600 } }),
    fetch(`${process.env.API_URL}/api/regions`, { next: { revalidate: 3600 } }),
  ]);

  if (roomRes.status === 404) {
    notFound();
  }
  if (!roomRes.ok) throw new Error(`/api/rooms/${params.id} 回應 ${roomRes.status}`);
  if (!regionsRes.ok) throw new Error(`/api/regions 回應 ${regionsRes.status}`);

  const room: Room = await roomRes.json();
  const locationList: LocationItem[] = await regionsRes.json();

  // 參數錯誤直接渲染 404 內容，原因同首頁
  if (!isValidStayParams(searchParams)) {
    return <RNotFound />;
  }

  // API 只給設施的 icon 名稱，換成對應的 lucide 元件
  const amenities = room.amenities.map((amenity) => ({
    icon: amenityIcons[amenity.iconType] ?? Check,
    label: amenity.label,
  }));

  // API 沒有分項評分，沿用總評分加減固定差值
  const ratingScores = ratingCategories.map((category) => ({
    label: category.label,
    score: Math.min(5, Number((room.rating + category.offset).toFixed(1))),
  }));

  return (
    <>
      <div className="bg-white shadow-md">
        <Navbar locationList={locationList} />
      </div>
      <RoomNav room={room} />
      <BaseCotainer>
        <div className="max-w-[1120px] mx-auto pb-24 lg:pb-8">
          <RoomHeader room={room} />
          <div id={ROOM_SECTION.gallery}>
            <RoomGallery room={room} />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-x-20">
            <div className="w-full lg:w-7/12">
              <RoomSummary room={room} host={room.host} />
              <RoomHost host={room.host} />
              <RoomDescription description={room.description} />
              <div id={ROOM_SECTION.amenities}>
                <RoomAmenities amenities={amenities} />
              </div>
            </div>
            <RoomBooking room={room} />
          </div>
          <div id={ROOM_SECTION.calendar}>
            <RoomCalendar />
          </div>
          <div id={ROOM_SECTION.reviews}>
            <RoomReviews
              room={room}
              ratingScores={ratingScores}
              allReviews={room.reviews}
            />
          </div>
        </div>
      </BaseCotainer>
      <Footer />
    </>
  );
};

export default RoomDetail;
