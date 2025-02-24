import PictureList from './components/Pictures/PictureList';
import { Suspense } from 'react';
import RPictureCardSkeleton from '@/components/Custom/RPictureCardSkeleton/RPictureCardSkeleton';
import Navbar from './components/Navbar/Navbar';
import ProductTab from './components/ProductTab/ProductTab';
import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <>
      <BaseCotainer>
        <Navbar />
      </BaseCotainer>
      <div className="w-full h-[1px] bg-gray-200"></div>
      <BaseCotainer>
        <ProductTab />
        <Suspense fallback={<RPictureCardSkeleton />}>
          <PictureList />
        </Suspense>
      </BaseCotainer>
      <Footer />
    </>
  );
}
