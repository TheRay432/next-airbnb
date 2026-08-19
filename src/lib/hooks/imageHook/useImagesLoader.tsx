import { useState, useEffect } from 'react';

export const useImagesLoader = (imageUrl: string) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(true);
    }
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setIsLoading(false);
    };
  }, [imageUrl]);

  return isLoading;
};
