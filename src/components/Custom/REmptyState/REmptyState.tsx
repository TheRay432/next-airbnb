import React from 'react';

const REmptyState = () => {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-6 py-16 rounded-2xl bg-gray-50">
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 房子 */}
        <path d="M30 78 L72 42 L114 78" stroke="#d1d5db" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 70 V118 H102 V70" stroke="#d1d5db" strokeWidth="6" strokeLinejoin="round" />
        <rect x="62" y="92" width="20" height="26" rx="2" stroke="#d1d5db" strokeWidth="6" />
        {/* 放大鏡 */}
        <circle cx="108" cy="104" r="22" fill="white" stroke="#ff385c" strokeWidth="6" />
        <path d="M124 120 L140 136" stroke="#ff385c" strokeWidth="8" strokeLinecap="round" />
      </svg>
      <p className="text-center text-gray-500 text-base leading-relaxed">
        目前暫無符合的房源，
        <br />
        建議您調整地點後再重新搜尋！
      </p>
    </div>
  );
};

export default REmptyState;
