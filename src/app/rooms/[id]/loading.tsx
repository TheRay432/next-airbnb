import React from 'react';
import Navbar from '@/app/components/Navbar/Navbar';
import RoomDetailSkeleton from './components/RoomDetailSkeleton';

const Loading = () => {
  return (
    <>
      <div className="bg-white shadow-md">
        <Navbar />
      </div>
      <RoomDetailSkeleton />
    </>
  );
};

export default Loading;
