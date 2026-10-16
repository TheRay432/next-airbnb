import { cn } from "@/lib/utils";
import { Search } from 'lucide-react';
import React from 'react';

interface SearchBarIconProps {
  isTop?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}
const SearchBarIcon = ({ isTop = false, onClick }: SearchBarIconProps) => {
  return (
    <div
      onClick={onClick}
      className={cn('bg-lightPrimary hover:bg-darkPrimary rounded-full flex items-center justify-center cursor-pointer', {
        'w-12 h-12': isTop,
        'w-8 h-8': !isTop,
      })}
    >
      <Search size={isTop ? 18 : 12} color="white" />
    </div>
  );
};

export default SearchBarIcon;
