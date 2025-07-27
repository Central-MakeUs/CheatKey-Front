import { useState, useRef, useEffect, useCallback } from "react";

import { motion, useMotionValue, animate, type PanInfo } from "framer-motion";

import { useCardNavigation } from "@/hooks/useCardNavigation";
import type { CategoryAnalysisResult } from "@/types/analyzeResult/analyzeResult.types";

import { DetailResultCard } from "@/components/analyze/DetailResultCard";
import { FirstResultCard } from "@/components/analyze/FirstResultCard";
import { PageIndicator } from "@/components/common/PageIndicator";

import { CARD_ANIMATION } from "@/constants/animation/cardAnimationConstants";

interface ResultCardListProps {
  currentData: CategoryAnalysisResult;
}

export const ResultCardList = ({ currentData }: ResultCardListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  const totalCards = 1 + currentData.details.detailCards.length;

  const { currentIndex, goToCard, goToNext, goToPrev, isTransitioning } =
    useCardNavigation({
      totalCards: totalCards,
    });

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const cardWidth = containerWidth * 0.85;
  const initialOffset = (containerWidth - cardWidth) / 2;

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent, info: PanInfo) => {
      setIsDragging(false);
      const { offset, velocity } = info;
      const swipeThreshold = 50;
      const velocityThreshold = 500;

      const isQuickSwipe = Math.abs(velocity.x) > velocityThreshold;
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

  useEffect(() => {
    if (!isDragging) {
      animate(
        x,
        initialOffset - currentIndex * cardWidth,
        CARD_ANIMATION.transition,
      );
    }
  }, [currentIndex, cardWidth, isDragging, initialOffset, x]);

  return (
    <div className="flex flex-col items-center justify-between gap-6">
      <div
        ref={containerRef}
        className="relative h-[30rem] w-full cursor-grab overflow-hidden"
        role="region"
        aria-label="분석 결과 카드"
      >
        <motion.div
          className="flex h-full items-center"
          style={{
            x,
            width: `${totalCards * cardWidth}px`,
          }}
          drag="x"
          dragConstraints={{
            right: initialOffset,
            left: initialOffset - (totalCards - 1) * cardWidth,
          }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: "grabbing" }}
        >
          <motion.div
            key="first-card"
            className="h-full flex-shrink-0"
            style={{ width: cardWidth }}
            animate={{
              scale: currentIndex === 0 ? 1 : 0.9,
              opacity: currentIndex === 0 ? 1 : 0.5,
            }}
            transition={CARD_ANIMATION.transition}
          >
            <FirstResultCard
              data={currentData.details.first}
              status={currentData.status}
              style={currentData.style}
            />
          </motion.div>
          {currentData.details.detailCards.map((detail, index) => {
            const cardIndex = index + 1;
            return (
              <motion.div
                key={detail.question}
                className="h-full flex-shrink-0"
                style={{ width: cardWidth }}
                animate={{
                  scale: currentIndex === cardIndex ? 1 : 0.9,
                  opacity: currentIndex === cardIndex ? 1 : 0.5,
                }}
                transition={CARD_ANIMATION.transition}
              >
                <DetailResultCard data={detail} style={currentData.style} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <PageIndicator
        total={totalCards}
        current={currentIndex + 1}
        indicatorColor={currentData.style.indicatorColor}
        onIndicatorClick={(index) => !isTransitioning && goToCard(index)}
        disabled={isTransitioning}
      />
    </div>
  );
};
