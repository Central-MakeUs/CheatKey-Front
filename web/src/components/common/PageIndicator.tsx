import { cn } from "@/utils/cn";

interface PageIndicatorProps {
  total: number;
  current: number;
}

export const PageIndicator = ({ total, current }: PageIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-1">
      {Array.from({ length: total }, (_, index) => (
        <div
          key={"indicator-" + (index + 1)}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index + 1 === current
              ? "bg-primary-400 w-4" // 활성화된 점 스타일
              : "w-2 bg-gray-700", // 비활성화된 점 스타일
          )}
        />
      ))}
    </div>
  );
};
