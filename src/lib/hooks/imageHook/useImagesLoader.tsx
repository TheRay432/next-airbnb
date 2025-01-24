import { Picture } from '@/app/components/Pictures/PictureList';
import { useState, useEffect } from 'react';

export const useImagesLoader = (picture: Picture) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!picture) {
      setIsLoading(true);
    }
    const img = new Image();
    img.src = picture.download_url;

    img.onload = () => {
      setIsLoading(false);
    };
  }, [picture]);

  return isLoading;
};
