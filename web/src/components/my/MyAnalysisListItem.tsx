import { useNavigate } from "react-router-dom";

import type { MyAnalysisItem } from "@/types/my/my.types";
import { formatUTCtoKR } from "@/utils/formatUTCtoKR";
import { generatePath } from "@/utils/generatePath";

import { AnalysisLevelBadge } from "@/components/my/AnalysisLevelBadge";
import { AnalysisTypeBadge } from "@/components/my/AnalysisTypeBadge";

import { PAGE_PATH } from "@/constants/route/path";

import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";

interface MyAnalysisListItemProps {
  item: MyAnalysisItem;
}

export const MyAnalysisListItem = ({ item }: MyAnalysisListItemProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      key={item.id}
      onClick={() =>
        navigate(
          generatePath(PAGE_PATH.ANALYZE.SPECIFIC.RESULT, {
            analyzeId: item.id,
          }),
        )
      }
      className="active:bg-gray-system-800 flex w-full flex-col px-5 py-5 text-left transition-colors duration-200"
    >
      <div className="mb-[0.9375rem] flex w-full items-center justify-between">
        <div className="flex gap-[7px]">
          <AnalysisLevelBadge status={item.status} />
          <AnalysisTypeBadge type={item.detectionType} />
        </div>
        <ArrowRightIcon className="text-gray-system-700 h-5 w-5" />
      </div>
      <p className="text-base-0 body-1-bold mb-[0.3125rem] w-full truncate text-ellipsis">
        {item.inputText}
      </p>
      <p className="text-gray-system-500 body-4-medium flex gap-[7px]">
        판독 날짜
        <span className="text-gray-system-600 body-5-regular">
          {formatUTCtoKR(item.detectedAt)}
        </span>
      </p>
    </button>
  );
};
