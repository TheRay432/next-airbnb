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
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { cn } from "@/lib/utils";
import { throttle } from 'lodash';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);
  const lastHeightRef = useRef(0);

  const handleGoHome = () => {
    router.push('/');
  }

  useEffect(() => {
    lastHeightRef.current = navRef.current?.offsetHeight ?? 0;

    const handleScroll = () => {
      const height = navRef.current?.offsetHeight ?? 0;
      // Navbar 高度改變時瀏覽器會自動調整 scrollY，這種不是使用者滾動造成的 scroll 不處理
      // 高度動畫 150ms，throttle 100ms 的每次呼叫都會讀到不同高度，動畫期間會一路略過
      if (height !== lastHeightRef.current) {
        lastHeightRef.current = height;
        return;
      }
      setIsTop(window.scrollY === 0);
    };

    // throttle 在建立時就固定，避免每次 render 重建、重新綁定監聽
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    return () => {
      throttledScroll.cancel();
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);
  return (
    <BaseCotainer>
      <div ref={navRef} className={cn('h-44 xl:h-24 py-4 relative transition-all', {
        'h-24': !isTop
      })}>
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <div className="text-lightPrimary flex items-center gap-1 text-xl cursor-pointer" onClick={handleGoHome}>
            <BedSingle />
            <h1 className="font-bold">Testbnb</h1>
          </div>
          {/* 搜尋引擎 */}
          {/* Searchbar 讀網址參數，靜態頁需包 Suspense 才能 build */}
          <Suspense>
            <Searchbar isTop={isTop} setIsTop={setIsTop} />
          </Suspense>
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
