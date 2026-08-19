import React from 'react';
import PictureContainer from './PictureContainer';
import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';
import { rooms } from '@/lib/constant/rooms';

const PictureList = () => {
  return (
    <BaseCotainer>
      <div className="w-full py-4">
        <PictureContainer rooms={rooms} />
      </div>
    </BaseCotainer>
  );
};

export default PictureList;
