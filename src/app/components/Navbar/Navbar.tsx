import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BedSingle, CircleUserRound, Menu } from 'lucide-react';
import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between py-4">
      <div className="text-hometitle flex items-center gap-1 text-xl">
        <BedSingle />
        <h1 className="font-bold">Testbnb</h1>
      </div>
      <div></div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" variant="outline" size="iconLogin">
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
  );
};

export default Navbar;
