import { useState, useRef } from "react";

import type { CategoryAnalysisResult } from "@/types/analyzeResult/analyzeResult.types";

import { ResultCard } from "@/components/analyze/ResultCard";
import { PageIndicator } from "@/components/common/PageIndicator";

interface ResultCardListProps {
  currentData: CategoryAnalysisResult;
}

export const ResultCardList = ({ currentData }: ResultCardListProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const allCards = [
    currentData.details.first,
    ...currentData.details.detailCards,
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={scrollContainerRef}
        className="flex snap-x snap-mandatory gap-x-4 overflow-x-scroll px-5"
      >
        <div data-index={0}>
          <ResultCard
            type="first"
            data={currentData.details.first}
            status={currentData.status}
            style={currentData.style}
          />
        </div>

        {currentData.details.detailCards.map((detail, index) => (
          <div key={detail.question} data-index={index + 1}>
            <ResultCard
              type="detail"
              data={detail}
              status={currentData.status}
              style={currentData.style}
            />
          </div>
        ))}
      </div>
      <PageIndicator
        total={allCards.length}
        current={activeIndex + 1}
        indicatorColor={currentData.style.indicatorColor}
      />
    </div>
  );
};
