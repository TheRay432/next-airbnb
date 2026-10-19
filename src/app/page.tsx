import PictureList from './components/Pictures/PictureList';
import { Suspense } from 'react';
import RPictureCardSkeleton from '@/components/Custom/RPictureCardSkeleton/RPictureCardSkeleton';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

export default function Home() {
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
