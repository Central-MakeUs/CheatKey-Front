import { useNavigate } from "react-router-dom";

import { PAGE_PATH } from "@/constants/route/path";

import AnalysisStarIcon from "@/assets/icons/analysis_star.svg?react";
import WriteIcon from "@/assets/icons/write_off.svg?react";
import CuttingSad from "@/assets/images/cutting_sad.svg?react";

interface NoResultProps {
  text: string;
  type: "ai" | "write" | "none";
}

export const NoResult = ({ text, type = "none" }: NoResultProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "write") {
      navigate(PAGE_PATH.COMMUNITY.SPECIFIC.WRITE);
    } else if (type === "ai") {
      navigate(PAGE_PATH.ANALYZE.BASE);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-18">
      <CuttingSad
        className="h-[8.125rem] w-[8.125rem]"
        aria-label="검색 결과가 없어서 슬픈 커팅이"
      />
      <p className="text-gray-system-500 body-3-regular text-center break-words whitespace-pre-line">
        {text}
      </p>
      {type !== "none" && (
        <button
          className="bg-bg-50 body-1-bold text-gray-system-500 mt-2.5 flex h-[2.625rem] w-fit items-center justify-center gap-0.5 rounded-full px-3"
          onClick={handleClick}
          aria-label={type === "write" ? "글 작성하기" : "AI로 분석하기"}
        >
          {type === "write" ? (
            <>
              <span>글 작성하기</span>
              <WriteIcon aria-hidden="true" focusable="false" />
            </>
          ) : (
            <>
              <span>AI로 분석하기</span>
              <AnalysisStarIcon aria-hidden="true" focusable="false" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
