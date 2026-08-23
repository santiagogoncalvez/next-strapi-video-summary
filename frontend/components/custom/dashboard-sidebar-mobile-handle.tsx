"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

const SWIPE_THRESHOLD = 30;

export function SidebarMobileHandle({ onOpen }: { onOpen: () => void }) {
   const startX = useRef<number | null>(null);
   const startY = useRef<number | null>(null);
   const opened = useRef(false);

   const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      startX.current = event.clientX;
      startY.current = event.clientY;
      opened.current = false;

      event.currentTarget.setPointerCapture(event.pointerId);
   };

   const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      const start = startX.current;
      const startYPosition = startY.current;

      if (start === null || startYPosition === null || opened.current) {
         return;
      }

      const deltaX = event.clientX - start;
      const deltaY = Math.abs(event.clientY - startYPosition);

      if (deltaX > SWIPE_THRESHOLD && deltaX > deltaY) {
         opened.current = true;
         onOpen();
      }
   };

   const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      startX.current = null;
      startY.current = null;
      opened.current = false;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
         event.currentTarget.releasePointerCapture(event.pointerId);
      }
   };

   return (
      <div
         className={cn(
            "fixed left-0 top-0 z-49 h-dvh w-5 bg-transparent touch-pan-y",
         )}
         onPointerDown={handlePointerDown}
         onPointerMove={handlePointerMove}
         onPointerUp={handlePointerUp}
         onPointerCancel={handlePointerUp}
      />
   );
}
