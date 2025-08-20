import type { DetectionType } from "@/types/my/my.types";

interface AnalysisTypeBadgeProps {
  type: DetectionType;
}

export const AnalysisTypeBadge = ({ type }: AnalysisTypeBadgeProps) => {
  const typeLabelMap: Record<DetectionType, string> = {
    URL: "URL 분석",
    CASE: "사례 분석",
  };

  return (
    <span className="text-gray-system-500 bg-base-50 caption-1-medium rounded-lg p-2">
      {typeLabelMap[type]}
    </span>
  );
};
