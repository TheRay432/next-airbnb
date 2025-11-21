import React from 'react';
import PictureContainer from './PictureContainer';
import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';

export interface Picture {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
const PictureList = async () => {
  const res = await fetch('https://picsum.photos/v2/list', {
    cache: 'no-store',
  });
  const pictures: Picture[] = await res.json();

  return (
    <BaseCotainer>
      <div className="w-full py-4">
        <PictureContainer pictures={pictures} />
      </div>
    </BaseCotainer>
  );
};

export default PictureList;
