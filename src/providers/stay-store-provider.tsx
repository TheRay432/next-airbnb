'use client';

import { type ReactNode, createContext, useState, useContext } from 'react';
import { useStore } from 'zustand';

import { type StayStore, createStayStore } from '@/stores/stay-store';

export type StayStoreApi = ReturnType<typeof createStayStore>;

export const StayStoreContext = createContext<StayStoreApi | undefined>(
  undefined,
);

export interface StayStoreProviderProps {
  children: ReactNode;
}

export const StayStoreProvider = ({ children }: StayStoreProviderProps) => {
  const [store] = useState(() => createStayStore());

  return (
    <StayStoreContext.Provider value={store}>
      {children}
    </StayStoreContext.Provider>
  );
};

// 訂房卡與入住日期日曆共用同一份日期與人數
export const useStayStore = <T,>(selector: (store: StayStore) => T): T => {
  const stayStoreContext = useContext(StayStoreContext);

  if (!stayStoreContext) {
    throw new Error(`useStayStore must be used within StayStoreProvider`);
  }

  return useStore(stayStoreContext, selector);
};
