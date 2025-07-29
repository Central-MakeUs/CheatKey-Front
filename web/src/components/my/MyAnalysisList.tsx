//리뷰

import { useNavigate } from "react-router-dom";

import type { MyAnalysisItem } from "@/types/my/my.types";

import { AnalysisLevelBadge } from "@/components/my/AnalysisLevelBadge";
import { AnalysisTypeBadge } from "@/components/my/AnalysisTypeBadge";

import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";

interface MyAnalysisListProps {
  items: MyAnalysisItem[];
}

export const MyAnalysisList = ({ items }: MyAnalysisListProps) => {
  const navigate = useNavigate();

  return (
    <>
      {items.map((item) => {
        return (
          //TODO: @tifsy 분석 상세 보기 경로 수정
          <button
            type="button"
            key={item.id}
            onClick={() => navigate("/home")}
            className={
              "active:bg-gray-system-800 w-full px-5 py-5 text-left transition-colors duration-200"
            }
            aria-label={`"${item.content}" 분석 상세 보기`}
          >
            <div className="mb-[0.9375rem] flex items-center justify-between">
              <div className="flex gap-[7px]">
                <AnalysisLevelBadge level={item.level} />
                <AnalysisTypeBadge type={item.analysisType} />
              </div>

              <ArrowRightIcon className="text-gray-system-700" />
            </div>

            <p className="text-base-0 body-1-bold mb-[0.3125rem] truncate">
              {item.content}
            </p>

            <p className="text-gray-system-500 body-4-medium flex gap-[7px]">
              판독 날짜
              <span className="text-gray-system-600 body-5-regular">
                {item.detectedAt}
              </span>
            </p>
          </button>
        );
      })}
    </>
  );
};
