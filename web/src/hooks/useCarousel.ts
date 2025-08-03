import { useState, useRef, useEffect, useCallback } from "react";

import { useMotionValue, animate, type PanInfo } from "framer-motion";

import { useCardNavigation } from "@/hooks/useCardNavigation";

import { CARD_ANIMATION } from "@/constants/animation/cardAnimationConstants";

interface UseCarouselProps {
  itemCount: number;
}

export const useCarousel = ({ itemCount }: UseCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  const navigation = useCardNavigation({ totalCards: itemCount });
  const { currentIndex, goToNext, goToPrev } = navigation;

  // 컨테이너 너비 측정
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 카드 너비 및 위치 계산
  const cardWidth = containerWidth * 0.85;
  const initialOffset = (containerWidth - cardWidth) / 2;

  // 드래그 핸들러
  const handleDragStart = useCallback(() => setIsDragging(true), []);
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent, info: PanInfo) => {
      setIsDragging(false);
      const { offset, velocity } = info;
      const swipeThreshold = 50;
      const velocityThreshold = 500; // 스와이프 속도

      const isQuickSwipe = Math.abs(velocity.x) > velocityThreshold;

      // 빠르게 스와이프 한 경우 조금만 움직여도 스와이프가 된 것처럼 동작하게 하는 방식 적용
      const effectiveThreshold = isQuickSwipe
        ? swipeThreshold * 0.3
        : swipeThreshold;

      if (offset.x > effectiveThreshold) {
        goToPrev();
      } else if (offset.x < -effectiveThreshold) {
        goToNext();
      } else {
        animate(
          x,
          initialOffset - currentIndex * cardWidth,
          CARD_ANIMATION.transition,
        );
      }
    },
    [goToNext, goToPrev, currentIndex, cardWidth, initialOffset, x],
  );

  // 인덱스 변경 시 애니메이션 동기화
  useEffect(() => {
    if (!isDragging && containerWidth > 0) {
      animate(
        x,
        initialOffset - currentIndex * cardWidth,
        CARD_ANIMATION.transition,
      );
    }
  }, [currentIndex, cardWidth, isDragging, initialOffset, containerWidth, x]);

  return {
    containerRef,
    cardWidth,
    isDragging,
    motionProps: {
      x,
      style: {
        x,
        width: cardWidth > 0 ? `${itemCount * cardWidth}px` : "100%",
      },
      drag: "x" as const,
      dragConstraints: {
        right: initialOffset,
        left: initialOffset - (itemCount - 1) * cardWidth,
      },
      dragElastic: 0.05,
      dragMomentum: false,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      whileDrag: { cursor: "grabbing" },
    },
    navigation,
  };
};
