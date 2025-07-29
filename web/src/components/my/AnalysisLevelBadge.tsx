//리뷰

import type { AnalysisLevel } from "@/types/my/my.types";
import { cn } from "@/utils/cn";

interface AnalysisLevelBadgeProps {
  level: AnalysisLevel;
}

export const AnalysisLevelBadge = ({ level }: AnalysisLevelBadgeProps) => {
  const badgeBgColor = {
    위험: "bg-error-50",
    주의: "bg-error-100",
    양호: "bg-primary-400",
  }[level];

  return (
    <span
      className={cn(
        "caption-1-medium text-base-0 rounded-lg p-2",
        badgeBgColor,
      )}
    >
      {level}
    </span>
  );
};
