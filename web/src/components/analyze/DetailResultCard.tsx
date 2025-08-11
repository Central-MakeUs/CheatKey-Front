import type {
  AnalysisDetailCardData,
  ResultCardStyle,
} from "@/types/analyzeResult/analyzeResult.types";
import { cn } from "@/utils/cn";

interface DetailResultCardProps {
  data: AnalysisDetailCardData;
  style: ResultCardStyle;
  className?: string;
}

export const DetailResultCard = ({
  data,
  style,
  className,
}: DetailResultCardProps) => {
  return (
    <section
      className={cn(
        "flex h-full w-full shrink-0 flex-col justify-between rounded-2xl border px-4 pt-5 pb-4",
        style.cardBackground,
        style.borderColor,
        className,
      )}
    >
      <h1
        className={cn(
          "head-4-semibold flex flex-col text-left",
          style.questionColor,
        )}
      >
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

      <img src={data.image} className="mx-auto h-auto w-full max-w-sm" />
      <div>
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
      </div>
    </section>
  );
};
