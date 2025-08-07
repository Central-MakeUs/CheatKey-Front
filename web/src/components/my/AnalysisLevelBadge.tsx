import { cn } from "@/utils/cn";

type AnalysisStatus = "SAFE" | "WARNING" | "DANGER";

interface AnalysisLevelBadgeProps {
  status: AnalysisStatus;
}

export const AnalysisLevelBadge = ({ status }: AnalysisLevelBadgeProps) => {
  const levelLabelMap: Record<AnalysisStatus, string> = {
    SAFE: "양호",
    WARNING: "주의",
    DANGER: "위험",
  };

  const badgeBgColorMap: Record<AnalysisStatus, string> = {
    SAFE: "bg-primary-400",
    WARNING: "bg-error-100",
    DANGER: "bg-error-50",
  };

  return (
    <span
      className={cn(
        "caption-1-medium text-base-0 rounded-lg p-2",
        badgeBgColorMap[status],
      )}
    >
      {levelLabelMap[status]}
    </span>
  );
};
