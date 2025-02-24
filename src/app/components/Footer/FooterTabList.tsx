'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TabList, TabSubMenu } from './FooterTabArea';
import { ChevronDown } from "lucide-react";

const activeClass =
  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black";

interface FooterTabListProps {
  tabList: TabList[];
  tabActive: string;
  tabSubMenu: TabSubMenu[];
  setTabActive: (tabId: string) => void;
}

const FooterTabList = ({
  tabList,
  tabActive,
  setTabActive,
  tabSubMenu,
}: FooterTabListProps) => {
  const [showAll, setShowAll] = React.useState(false);
  const displayLimit = 17; //最多顯示18筆資料
  const displayedItems = showAll ? tabSubMenu : tabSubMenu.slice(0, displayLimit);
  const hasMore = tabSubMenu.length > displayLimit;

  return (
    <div className="w-full">
      <Tabs
        defaultValue={tabList[0].id}
        onValueChange={(tabId) => setTabActive(tabId)}
      >
        <TabsList isListTab>
          {tabList.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              <span className={cn('text-sm', tabActive === tab.id && activeClass)}>
                {tab.value}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tabActive}>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-5 gap-y-10 mt-8">
            {displayedItems.map((subMenu) => (
              <div key={subMenu.title}>
                <p className="text-sm">{subMenu.title}</p>
                <p className="text-sm text-gray-500">{subMenu.type}</p>
              </div>
            ))}
            {!showAll && hasMore && (
              <div 
                className="cursor-pointer hover:text-gray-600 flex items-center"
                onClick={() => setShowAll(true)}
              >
                <p className="text-sm">顯示更多</p>
                <ChevronDown size={16} />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FooterTabList;
