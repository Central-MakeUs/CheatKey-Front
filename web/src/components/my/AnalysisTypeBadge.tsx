type AnalysisType = "URL" | "TEXT";

interface AnalysisTypeBadgeProps {
  type: AnalysisType;
}

export const AnalysisTypeBadge = ({ type }: AnalysisTypeBadgeProps) => {
  const typeLabelMap: Record<AnalysisType, string> = {
    URL: "URL 분석",
    TEXT: "텍스트 분석",
  };

  return (
    <span className="text-gray-system-500 bg-base-50 caption-1-medium rounded-lg p-2">
      {typeLabelMap[type]}
    </span>
  );
};
