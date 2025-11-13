import type {
  AnalysisFirstCardData,
  ResultCardStyle,
} from "@/types/analyzeResult/analyzeResult.types";

import { ANALYSIS_STATUS, STATUS_TEXT_MAP } from "@/constants/analyze/result";

import { cn } from "@/lib/cn";

interface FirstResultCardProps {
  data: AnalysisFirstCardData;
  status: keyof typeof ANALYSIS_STATUS;
  style: ResultCardStyle;
  className?: string;
}

export const FirstResultCard = ({
  data,
  status,
  style,
  className,
}: FirstResultCardProps) => {
  return (
    <section
      className={cn(
        "flex h-full w-full shrink-0 flex-col items-center rounded-2xl border px-4 py-5",
        style.cardBackground,
        style.borderColor,
        className,
      )}
    >
      <div
        className={cn(
          "head-3-bold mb-4 h-9 w-28 rounded-lg text-center",
          style.statusBackground,
          style.primaryColor,
        )}
      >
        {STATUS_TEXT_MAP[status]}
      </div>
      <img
        src={data.image}
        alt={`${status} 상태 아이콘`}
        className="h-40 w-40"
      />
      <div
        className={cn(
          "mt-5 mb-8 flex w-full items-center justify-center rounded-xl py-4",
          style.cardInnerBackground,
        )}
      >
        <p className="caption-2-regular text-gray-system-500 flex px-3 text-center whitespace-pre-line">
          {data.explain}
        </p>
      </div>
      <footer className="caption-1-medium text-gray-system-500 flex w-full flex-col gap-y-1.5">
        <p>{data.footer.header}</p>
        <div className="flex flex-col gap-y-1">
          {data.footer.items.map((item) => (
            <div key={item.label} className="flex gap-2">
              <span>{item.label}</span>
              <div className="bg-gray-system-700 h-4 w-[0.5px]" />
              <span className="caption-2-regular text-gray-system-600">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </section>
  );
};
