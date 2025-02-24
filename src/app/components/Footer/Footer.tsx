import React from 'react';
import FooterTabArea from './FooterTabArea';
import FooterContainer from './FooterContainer';
import {
  footerInfoA,
  footerInfoB,
  footerInfoC,
} from '@/lib/constant/footerInfo';

const Footer = () => {
  return (
    <footer className="w-full bg-footer">
      <FooterContainer>
        <h1 className="text-xl">為下一次度假尋找靈感</h1>
        <FooterTabArea />
      </FooterContainer>
      <div className="w-full h-[1px] bg-gray-200"></div>
      <FooterContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 gap-y-10">
          <div className="flex flex-col gap-y-2">
            {footerInfoA.map((item, index) => (
              <p key={index} className="text-sm text-moreBtn">
                {item}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-y-2">
            {footerInfoB.map((item, index) => (
              <p key={index} className="text-sm text-moreBtn">
                {item}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-y-2">
            {footerInfoC.map((item, index) => (
              <p key={index} className="text-sm text-moreBtn">
                {item}
              </p>
            ))}
          </div>
        </div>
      </FooterContainer>
    </footer>
  );
};

export default Footer;
