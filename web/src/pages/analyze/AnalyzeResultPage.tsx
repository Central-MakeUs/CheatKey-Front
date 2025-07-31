import { useLocation, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import type { AnalyzeResponse } from "@/types/analyzeResult/analyzeResult.types";
import { cn } from "@/utils/cn";

import { ResultCardList } from "@/components/analyze/ResultCardList";

import { ALL_ANALYSIS_DATA } from "@/constants/analyze/result";
import {
  STAGGER_CONTAINER,
  FADE_IN_UP_ITEM,
} from "@/constants/animation/enterAnimation";

import Close from "@/assets/icons/close.svg?react";

export const AnalyzeResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const responseData = location.state as AnalyzeResponse | null;

  if (!responseData) {
    // TODO: @Ki-Tak 추후, PR 머지 되면 로딩 스피너 보여줄 예정
    return null;
  }

  const category = responseData.group;
  const status = responseData.status;

  const currentData = ALL_ANALYSIS_DATA[category][status];
  const { style } = currentData;

  return (
    <motion.div
      className={cn(
        "relative flex h-full w-full flex-1 flex-col",
        style.background,
      )}
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        variants={FADE_IN_UP_ITEM}
        className="head-3-bold text-base-0 h-header relative flex w-full items-center justify-center bg-transparent"
      >
        분석 리포트
        <button
          type="button"
          className="absolute right-5 h-8 w-8"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
        >
          <Close className="text-gray-system-50 h-full w-full" />
        </button>
      </motion.header>
      <motion.h1
        variants={FADE_IN_UP_ITEM}
        className="head-3-bold text-base-0 px-5 pt-[1.875rem] pb-8"
      >
        {currentData.title}
      </motion.h1>
      <motion.div variants={FADE_IN_UP_ITEM}>
        <ResultCardList currentData={currentData} />
      </motion.div>
      <motion.p
        variants={FADE_IN_UP_ITEM}
        className="caption-2-regular text-gray-system-600 mt-12 w-full text-center"
      >
        *AI는 기대와 다른 결과가 나올 수 있습니다.
      </motion.p>
    </motion.div>
  );
};
