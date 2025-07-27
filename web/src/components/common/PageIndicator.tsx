import { cn } from "@/utils/cn";

interface PageIndicatorProps {
  total: number;
  current: number;
  indicatorColor: string;
  className?: string;
  onIndicatorClick?: (index: number) => void;
  disabled?: boolean;
}

export const PageIndicator = ({
  total,
  current,
  indicatorColor,
  className,
  onIndicatorClick,
  disabled = false,
}: PageIndicatorProps) => {
  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
      role="tablist"
      aria-label="카드 네비게이션"
    >
      {Array.from({ length: total }, (_, index) => {
        const isActive = index + 1 === current;
        return (
          <button
            key={"indicator-" + (index + 1)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
              isActive
                ? `${indicatorColor} w-4` // 활성화된 점 스타일
                : "w-2 bg-gray-700 hover:bg-gray-600", // 비활성화된 점 스타일
            )}
            onClick={() => onIndicatorClick?.(index)}
            role="tab"
            aria-selected={isActive}
            aria-label={`${index + 1}번째로 이동`}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};
