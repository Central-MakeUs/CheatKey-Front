import { useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

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
    </div>
  );
};
