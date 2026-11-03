'use client';

import { useEffect, useState } from 'react';

// 與 Tailwind 的 md 斷點相同
const DESKTOP_QUERY = '(min-width: 48rem)';

/** 寬度 768px 以上為桌機；初始值固定為 false，server 與 client 首次渲染才一致 */
export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return isDesktop;
};
