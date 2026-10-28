import PictureList from './components/Pictures/PictureList';
import { Suspense } from 'react';
import RPictureCardSkeleton from '@/components/Custom/RPictureCardSkeleton/RPictureCardSkeleton';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { isValidStayParams } from '@/lib/stayParams';
import RNotFound from '@/components/Custom/RNotFound/RNotFound';
import { LocationItem } from '@/types/location';

// 後端在 Cloud Run 會縮到 0，冷啟動可能超過預設的 10 秒
export const maxDuration = 60;

interface HomeProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Home({ searchParams }: HomeProps) {
  // 不用 notFound()：同路徑只換參數時，Next 的 404 邊界不會重置，回首頁會卡在 404
  if (!isValidStayParams(searchParams)) {
    return <RNotFound />;
  }

  const rawPlaceId = searchParams.place_id;
  const placeId = Array.isArray(rawPlaceId) ? rawPlaceId[0] : rawPlaceId;

  // 地點清單很少變動，快取一小時
  const res = await fetch(`${process.env.API_URL}/api/regions`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`/api/regions 回應 ${res.status}`);
  const locationList: LocationItem[] = await res.json();

  return (
    <>
      <div className="sticky top-0 bg-white z-10 shadow-md">
        <Navbar locationList={locationList} />
        <div className="w-full h-[1px] bg-gray-200"></div>
      </div>
      {/* 換地點時重新掛載，才會顯示骨架並重置已載入筆數 */}
      <Suspense key={placeId} fallback={<RPictureCardSkeleton />}>
        <PictureList placeId={placeId} />
      </Suspense>
      <Footer />
    </>
  );
}
