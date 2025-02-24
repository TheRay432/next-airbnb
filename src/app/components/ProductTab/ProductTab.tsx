'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ProductTab = () => {
  const [scrollSlides, setScrollSlides] = useState(10);

  const handleScrollSlides = () => {
    switch (true) {
      case window.innerWidth >= 1024:
        setScrollSlides(14);
        break;
      case window.innerWidth >= 640:
        setScrollSlides(6);
        break;
      default:
        setScrollSlides(4);
    }
  };

  useEffect(() => {
    handleScrollSlides();
    window.addEventListener('resize', handleScrollSlides);
    return () => {
      window.removeEventListener('resize', handleScrollSlides);
    };
  }, []);

  return (
    <div className="w-full py-4">
      <div className="w-full">
        <Carousel opts={{ slidesToScroll: scrollSlides }}>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselContent>
            {Array.from({ length: 55 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/4 sm:basis-1/6 lg:basis-7/100 text-gray-700"
              >
                <div className="flex flex-col items-center  gap-2">
                  <User size={20} />
                  <p className="text-xs">著名城市{index + 1}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductTab;
