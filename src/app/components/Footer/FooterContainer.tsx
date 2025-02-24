import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';
import React from 'react';

interface FooterContainerProps {
  children: React.ReactNode;
}

const FooterContainer = ({ children }: FooterContainerProps) => {
  return (
    <BaseCotainer>
      <div className="w-full 2xl:grid 2xl:grid-cols-6">
        <div className="hidden 2xl:block 2xl:col-span-1"></div>
        <div className="2xl:col-span-4 py-10">
            {children}
        </div>
        <div className="hidden 2xl:block 2xl:col-span-1"></div>
      </div>
    </BaseCotainer>
  );
};

export default FooterContainer;
