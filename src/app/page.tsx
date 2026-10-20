import PictureList from './components/Pictures/PictureList';
import { Suspense } from 'react';
import RPictureCardSkeleton from '@/components/Custom/RPictureCardSkeleton/RPictureCardSkeleton';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { isValidStayParams } from '@/lib/stayParams';
import RNotFound from '@/components/Custom/RNotFound/RNotFound';

interface HomeProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Home({ searchParams }: HomeProps) {
  // 不用 notFound()：同路徑只換參數時，Next 的 404 邊界不會重置，回首頁會卡在 404
  if (!isValidStayParams(searchParams)) {
    return <RNotFound />;
  }

  return (
    <>
      <div className="sticky top-0 bg-white z-10 shadow-md">
        <Navbar />
        <div className="w-full h-[1px] bg-gray-200"></div>
      </div>
      <Suspense fallback={<RPictureCardSkeleton />}>
        <PictureList />
      </Suspense>
      <Footer />
    </>
  );
}
