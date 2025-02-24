'use client';
import React, { useEffect, useState } from 'react';
import FooterTabList from './FooterTabList';
import { footerTabList } from '@/lib/constant/tab';

export interface TabSubMenu {
  title: string;
  type: string;
}
export interface TabList {
  id: string;
  value: string;
  subMenu: TabSubMenu[];
}



const FooterTabArea = () => {
  const [tabActive, setTabActive] = useState<string>(footerTabList[0].id);
  const [tabSubMenu, setTabSubMenu] = useState<TabSubMenu[]>([]);

  useEffect(() => {
    setTabSubMenu(footerTabList.find((tab) => tab.id === tabActive)?.subMenu || []);
  }, [tabActive]);
  return (
    <>
      <FooterTabList
        tabList={footerTabList}
        tabActive={tabActive}
        setTabActive={setTabActive}
        tabSubMenu={tabSubMenu}
      />
    </>
  );
};

export default FooterTabArea;
