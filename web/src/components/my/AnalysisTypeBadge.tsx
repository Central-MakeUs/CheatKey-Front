import type { AnalysisType } from "@/types/my/my.types";

interface AnalysisTypeBadgeProps {
  type: AnalysisType;
}

export const AnalysisTypeBadge = ({ type }: AnalysisTypeBadgeProps) => {
  return (
    <span className="text-gray-system-500 bg-base-50 caption-1-medium rounded-lg p-2">
      {type}
    </span>
  );
};
