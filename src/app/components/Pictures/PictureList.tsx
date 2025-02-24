import React from 'react';
import PictureContainer from "./PictureContainer";

export interface Picture {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
const PictureList = async () => {
  const res = await fetch('https://picsum.photos/v2/list', { cache: 'no-store' });
  const pictures: Picture[] = await res.json();

  return (
    <div className="w-full py-4">
      <PictureContainer pictures={pictures} />
    </div>
  );
};

export default PictureList;
