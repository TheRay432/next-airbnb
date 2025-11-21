import React from 'react';
import { cn } from '@/lib/utils';
interface BaseCotainerProps {
  children: React.ReactNode;
  className?: string;
  isNoContainer?: boolean;
}
const BaseCotainer = ({
  children,
  className,
  isNoContainer = false,
}: BaseCotainerProps) => {
  return (
    <div
      className={cn('w-full', className, {
        'px-10 xl:px-20': !isNoContainer,
      })}
    >
      {children}
    </div>
  );
};

export default BaseCotainer;
