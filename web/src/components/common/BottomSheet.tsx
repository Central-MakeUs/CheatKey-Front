import { useState, useRef, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const startY = useRef<number>(0);

  const [dragY, setDragY] = useState<number>(0); // 드래그로 인해 시트가 아래로 이동한 거리를 저장

  /* 드래그 시작 시 호출되는 핸들러 (마우스/터치) */
  const handleDragStart = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    ) => {
      // PC(MouseEvent)와 모바일(TouchEvent) 이벤트를 동일하게 처리
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      isDragging.current = true;
      startY.current = y;

      if (sheetRef.current) {
        sheetRef.current.style.transition = "none";
      }
    },
    [],
  );

  /* 드래그 중 마우스/터치가 움직일 때마다 호출되는 핸들러 */
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    // 드래그 중일 때만 실행
    if (!isDragging.current) return;

    // 모바일에서 드래그 시 배경 스크롤을 막기 위함
    e.preventDefault();

    if (!isDragging.current) return;
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaY = y - startY.current;

    // 시트가 위로 올라가는 것을 방지 (아래로만 드래그 가능)
    const newY = Math.max(0, deltaY);
    setDragY(newY);
  }, []);

  /* 드래그 종료 시 호출되는 핸들러 (마우스/터치) */
  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (sheetRef.current) {
      sheetRef.current.style.transition = "transform 300ms ease-in-out";
    }

    // 드래그 거리가 50px를 넘으면 닫기
    if (dragY > 50) {
      onClose();
    } else {
      // 50px 미만이면 원위치로 복귀
      setDragY(0);
    }
  }, [dragY, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setDragY(0);
    }

    // 시트가 열려있을 때 body 스크롤을 막음
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center backdrop-blur-[2px] transition-opacity duration-300 ${
        isOpen ? "bg-black/50" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        ref={sheetRef}
        className="bg-bg-50 w-full max-w-lg rounded-t-[1.625rem] shadow-lg transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateY(calc(${isOpen ? "0%" : "100%"} + ${dragY}px))`,
        }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div
          className="flex h-[1.625rem] w-full"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="bg-gray-system-600 m-auto h-1 w-10 cursor-grab rounded-full" />
        </div>
        {children}
      </div>
    </div>
  );
};
