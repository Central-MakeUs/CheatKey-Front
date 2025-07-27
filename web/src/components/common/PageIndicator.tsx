// 안쓰는 컴포넌트지만, 추후에 사용될 수도 있어서 냅두겠습니다 (디자인 변경으로 사라진건 안 비밀..)
import { cn } from "@/utils/cn";

interface PageIndicatorProps {
  total: number;
  current: number;
  className?: string;
}

export const PageIndicator = ({
  total,
  current,
  className,
}: PageIndicatorProps) => {
  return (
    <div
      className={cn("flex items-center justify-center space-x-1", className)}
    >
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
