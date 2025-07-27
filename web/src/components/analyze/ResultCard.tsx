import type {
  AnalysisDetailCardData,
  AnalysisFirstCardData,
  ResultCardStyle,
} from "@/types/analyzeResult/analyzeResult.types";
import { cn } from "@/utils/cn";

import {
  ANALYSIS_STATUS,
  STATUS_TEXT_MAP,
} from "@/constants/analyze/analyzeResultConstants";

export type ResultCardProps =
  | {
      type: "first";
      data: AnalysisFirstCardData;
      status: keyof typeof ANALYSIS_STATUS;
      style: ResultCardStyle;
      className?: string;
    }
  | {
      type: "detail";
      data: AnalysisDetailCardData;
      status: keyof typeof ANALYSIS_STATUS;
      style: ResultCardStyle;
      className?: string;
    };

export const ResultCard = ({
  type,
  data,
  status,
  style,
  className,
}: ResultCardProps) => {
  if (type === "first") {
    return (
      <section
        className={cn(
          "flex h-fit min-h-[28.375rem] w-[calc(100vw-50px)] shrink-0 snap-center flex-col items-center rounded-2xl border px-4 py-5",
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
  } else if (type === "detail") {
    return (
      <section
        className={cn(
          "flex h-fit min-h-[28.375rem] w-[calc(100vw-50px)] shrink-0 snap-center flex-col rounded-2xl border px-4 pt-5 pb-4",
          style.cardBackground,
          style.borderColor,
          className,
        )}
      >
        <div className="flex flex-col justify-between text-left">
          <h1 className={cn("head-4-semibold", style.questionColor)}>
            {data.question}
            <br />
            <span
              className={cn(
                "head-2-semibold whitespace-pre-wrap",
                style.primaryColor,
              )}
            >
              {data.answer}
            </span>
          </h1>
          <img src={data.image} className="h-auto w-full" />
        </div>
        <div
          className={cn(
            "mt-5 mb-4 flex w-full items-center justify-center rounded-xl px-3 py-4",
            style.cardInnerBackground,
          )}
        >
          <p className="caption-2-regular text-gray-system-500 flex text-left whitespace-pre-line">
            {data.explain}
          </p>
        </div>
        <footer className="caption-2-regular text-gray-system-600 w-full text-center">
          {data.footer}
        </footer>
      </section>
    );
  }
};
