import { useEffect } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { getAnalyzeResult } from "@/apis/analyze/getAnalyzeResult";
import { useBackgroundColor } from "@/contexts/BackgroundColorContext";
import { cn } from "@/lib/cn";
import type { AnalyzeResponse } from "@/types/analyzeResult/analyzeResult.types";

import { ResultCardList } from "@/components/analyze/ResultCardList";
import { LoadingScreen } from "@/components/animation/LoadingScreen";

import { ALL_ANALYSIS_DATA } from "@/constants/analyze/result";
import {
  STAGGER_CONTAINER,
  FADE_IN_UP_ITEM,
} from "@/constants/animation/enterAnimation";
import { QUERY_KEYS } from "@/constants/apiConstants";

import Close from "@/assets/icons/close.svg?react";

export const AnalyzeResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { analyzeId } = useParams<{ analyzeId: string }>();

  const { setBgColor } = useBackgroundColor();

  const { data: analyzeResultData, isLoading: isAnalyzeResultDataLoading } =
    useQuery({
      queryKey: [QUERY_KEYS.GET_DETECTION_RESULT, analyzeId],
      queryFn: () => getAnalyzeResult({ detectionId: parseInt(analyzeId!) }),
      enabled: !location.state && !!analyzeId,
      select: (response) => {
        return {
          id: response.id,
          group: response.group,
          status: response.status,
        };
      },
      staleTime: 5 * 60 * 1000,
    });

  const responseData = (location.state ||
    analyzeResultData) as AnalyzeResponse | null;

  useEffect(() => {
    if (responseData) {
      const style =
        ALL_ANALYSIS_DATA[responseData.group]?.[responseData.status]?.style;

      if (style) {
        setBgColor(style.background);
      }
    }

    return () => {
      setBgColor("bg-bg-100");
    };
  }, [setBgColor, responseData]);

  if (isAnalyzeResultDataLoading || !responseData) {
    return <LoadingScreen />;
  }

  const currentData =
    ALL_ANALYSIS_DATA[responseData.group]?.[responseData.status];

  return (
    <motion.div
      className={cn("flex flex-1 flex-col overflow-y-auto")}
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
