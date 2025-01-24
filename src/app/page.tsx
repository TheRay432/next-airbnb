import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { BedSingle, CircleUserRound, Menu, User } from 'lucide-react';
import PictureList from "./components/Pictures/PictureList";

export default function Home() {
  return (
    <>
      <div className="w-full flex items-center justify-between px-10 xl:px-20 py-4">
        <div className="text-hometitle flex items-center gap-1 text-xl">
          <BedSingle />
          <h1 className="font-bold">Testbnb</h1>
        </div>
        <div></div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full"
                variant="outline"
                size="iconLogin"
              >
                <Menu size={16} />
                <CircleUserRound size={34} strokeWidth={1} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>註冊</DropdownMenuItem>
              <DropdownMenuItem>登入</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>發布房源</DropdownMenuItem>
              <DropdownMenuItem>舉辦體驗</DropdownMenuItem>
              <DropdownMenuItem>說明中心</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200"></div>

      <div className="w-full px-10 xl:px-20 py-4">
        <div className="w-full">
          <Carousel opts={{ slidesToScroll: 10 }}>
            <CarouselPrevious className="hidden md:inline-flex" />
            <CarouselContent>
              {Array.from({ length: 55 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/4 sm:basis-1/6 lg:basis-7/100 text-gray-700">
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

      <PictureList />
    </>
  );
}
