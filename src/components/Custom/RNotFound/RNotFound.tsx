import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';

const RNotFound = () => {
  return (
    <>
      <div className="sticky top-0 bg-white z-10 shadow-md">
        <Navbar />
        <div className="w-full h-[1px] bg-gray-200"></div>
      </div>
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 py-16">
        <svg
          width="240"
          height="160"
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* 走偏的虛線足跡 */}
          <path
            d="M16 146 C56 156 76 118 120 122"
            stroke="#d1d5db"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="2 10"
          />
          {/* 左右兩個 4 */}
          <path d="M44 24 L20 80 H64 M54 52 V112" stroke="#d1d5db" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M200 24 L176 80 H220 M210 52 V112" stroke="#d1d5db" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          {/* 中間的 0 是地標 */}
          <ellipse cx="120" cy="122" rx="16" ry="4" fill="#e5e7eb" />
          <path
            d="M120 120 C120 120 90 88 90 64 A30 30 0 0 1 150 64 C150 88 120 120 120 120 Z"
            fill="#ff385c"
          />
          <circle cx="120" cy="64" r="16" fill="white" />
          <path
            d="M114 59 A6 6 0 1 1 122 65 C120 66 120 67 120 69"
            stroke="#ff385c"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="120" cy="75" r="2.5" fill="#ff385c" />
        </svg>
        <p className="text-center text-gray-500 text-base leading-relaxed">
          很抱歉，您查詢的頁面似乎迷路了！
        </p>
        <Button asChild variant="moreBtn" className="rounded-lg px-6">
          <Link href="/">回首頁</Link>
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default RNotFound;
