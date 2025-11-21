'use client';
import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BedSingle, CircleUserRound, Menu } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { cn } from "@/lib/utils";
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const router = useRouter();

  const handleScroll = () => {
    setIsTop(window.scrollY === 0);
  };

  const debouceFc = debounce(handleScroll, 100);

  const handleGoHome = () => {
    router.push('/');
  }

  useEffect(() => {
    window.addEventListener('scroll', debouceFc);
    return () => {
      window.removeEventListener('scroll', debouceFc);
    };
  }, [debouceFc]);
  return (
    <BaseCotainer>
      <div className={cn('h-44 xl:h-24 py-4 relative transition-all', {
        'h-24': !isTop
      })}>
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <div className="text-lightPrimary flex items-center gap-1 text-xl cursor-pointer" onClick={handleGoHome}>
            <BedSingle />
            <h1 className="font-bold">Testbnb</h1>
          </div>
          {/* 搜尋引擎 */}
          <Searchbar isTop={isTop} setIsTop={setIsTop} />
          {/* 使用者資訊 */}
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
    </BaseCotainer>
  );
};

export default Navbar;
