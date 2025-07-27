import { useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

import { ResultCard } from "@/components/analyze/ResultCard";
import { PageIndicator } from "@/components/common/PageIndicator";

import {
  ANALYSIS_STATUS,
  ANALYSIS_CATEGORY,
  ALL_ANALYSIS_DATA,
} from "@/constants/analyze/analyzeResultConstants";

import Close from "@/assets/icons/close.svg?react";

export const AnalyzeResultPage = () => {
  const navigate = useNavigate();

  const category = ANALYSIS_CATEGORY.FISHING;
  const status = ANALYSIS_STATUS.DANGER;

  const currentData = ALL_ANALYSIS_DATA[category][status];
  const { style } = currentData;

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-1 flex-col",
        style.background,
      )}
    >
      <header className="head-3-bold text-base-0 h-header relative flex w-full items-center justify-center bg-transparent">
        분석 리포트
        <button
          type="button"
          className="absolute right-5 h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <Close className="text-gray-system-50 h-full w-full" />
        </button>
      </header>
      <h1 className="head-3-bold text-base-0 px-5 pt-[1.875rem] pb-8">
        {currentData.title}
      </h1>
      <div className="flex snap-x snap-mandatory gap-x-4 overflow-x-scroll px-5">
        <ResultCard
          type="first"
          data={currentData.details.first}
          status={currentData.status}
          style={currentData.style}
        />
        {currentData.details.detailCards.map((deatil) => (
          <ResultCard
            type="detail"
            data={deatil}
            status={currentData.status}
            style={currentData.style}
          />
        ))}
      </div>
      <PageIndicator total={3} current={1} />
      <p className="caption-2-regular text-gray-system-600 w-full text-center">
        *AI는 기대와 다른 결과가 나올 수 있습니다.
      </p>
    </div>
  );
};
