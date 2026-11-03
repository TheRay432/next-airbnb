'use client';

import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// 往下拖超過抽屜高度的這個比例才關閉，不到就彈回
const DRAG_CLOSE_RATIO = 0.25;

interface RBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
}

const RBottomSheet = ({ open, onOpenChange, trigger, title, children }: RBottomSheetProps) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartYRef = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartYRef.current = e.clientY;
    // 手指移出把手範圍也要持續追蹤
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    // 只能往下拖，往上不超出原本的高度
    setDragY(Math.max(0, e.clientY - dragStartYRef.current));
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // 高度隨內容變動，放開時才讀
    const height = contentRef.current?.offsetHeight ?? 0;
    if (dragY > height * DRAG_CLOSE_RATIO) {
      onOpenChange(false);
    } else {
      setDragY(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {/* 保留 DialogContent 預設的水平置中，進場的水平位移才會剛好落在原位，只改垂直方向 */}
      {/* DialogContent 預設的動畫 class 在 CSS 中排在後面，覆寫須加 ! 才會生效 */}
      <DialogContent
        ref={contentRef}
        className="flex flex-col p-0 gap-0 max-w-none max-h-[90dvh] top-auto bottom-0 translate-y-0 rounded-t-xl sm:rounded-none sm:rounded-t-xl overflow-hidden transition-[translate]
          data-[state=open]:!slide-in-from-bottom-full data-[state=closed]:!slide-out-to-bottom-full
          data-[state=open]:!zoom-in-100 data-[state=closed]:!zoom-out-100
          data-[state=open]:!fade-in-100 data-[state=closed]:!fade-out-100"
        style={{
          // 用 translate 屬性而非 transform，才不會蓋掉水平置中
          translate: dragY > 0 ? `0 ${dragY}px` : undefined,
          // 拖曳中跟手，放開後才用 transition 彈回
          transition: isDragging ? 'none' : undefined,
        }}
        // 開啟由使用端控制，在這裡重置；關閉時重置會讓抽屜在離場動畫中跳回原位
        onOpenAutoFocus={() => setDragY(0)}
        aria-describedby={undefined}
      >
        {/* 從把手或標題列往下拖可關閉 */}
        <div
          className="touch-none"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-lightgray" />
          <DialogTitle className="flex items-center gap-2 p-6 border-b border-lightgray">
            {title}
          </DialogTitle>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default RBottomSheet;
