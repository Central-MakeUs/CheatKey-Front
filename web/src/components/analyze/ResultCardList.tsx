import { motion, type Variants } from "framer-motion";

import { useCarousel } from "@/hooks/useCarousel";
import type { CategoryAnalysisResult } from "@/types/analyzeResult/analyzeResult.types";
import { cn } from "@/utils/cn";

import { DetailResultCard } from "@/components/analyze/DetailResultCard";
import { FirstResultCard } from "@/components/analyze/FirstResultCard";
import { PageIndicator } from "@/components/common/PageIndicator";

import { CARD_ANIMATION } from "@/constants/animation/cardAnimationConstants";

interface ResultCardListProps {
  currentData: CategoryAnalysisResult;
  variants?: Variants;
}

export const ResultCardList = ({
  currentData,
  variants,
}: ResultCardListProps) => {
  const totalCards = 1 + currentData.details.detailCards.length;

  const { containerRef, cardWidth, motionProps, navigation } = useCarousel({
    itemCount: totalCards,
  });

  const { currentIndex, goToCard, isTransitioning } = navigation;

  return (
    <motion.div
      className="flex flex-col items-center justify-between gap-6"
      variants={variants}
    >
      <div
        ref={containerRef}
        className={cn("relative h-120 w-full cursor-grab overflow-hidden", {
          "px-5": currentData.status === "UNKNOWN",
        })}
        role="region"
        aria-label="분석 결과 카드"
      >
        {currentData.status === "UNKNOWN" ? (
          <FirstResultCard
            data={currentData.details.first}
            status={currentData.status}
            style={currentData.style}
          />
        ) : (
          <motion.div className="flex h-full items-center" {...motionProps}>
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
        )}
      </div>

      <PageIndicator
        total={totalCards}
        current={currentIndex + 1}
        indicatorColor={currentData.style.indicatorColor}
        onIndicatorClick={(index) => !isTransitioning && goToCard(index)}
        disabled={isTransitioning}
        className={currentData.status === "UNKNOWN" ? "opacity-0" : ""}
      />
    </motion.div>
  );
};
