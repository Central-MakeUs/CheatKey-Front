import type {
  AllAnalysisData,
  CategoryAnalysisResult,
} from "@/types/analyzeResult/analyzeResult.types";

import {
  ANALYSIS_STATUS,
  ANALYSIS_CATEGORY,
  SAFE_STYLE,
  WARNING_STYLE,
  DANGER_STYLE,
} from "@/constants/analyze/result/common";
import { DETAIL_CARD_CONTENT } from "@/constants/analyze/result/detailCards";
import {
  FIRST_CARD_CONTENT,
  FIRST_FOOTER_HEADER,
  FIRST_FOOTER_ITEMS,
} from "@/constants/analyze/result/firstCard";

const createAnalysisData = (
  categoryKey: keyof typeof DETAIL_CARD_CONTENT,
  status: keyof typeof ANALYSIS_STATUS,
): CategoryAnalysisResult => {
  const statusStyles = {
    SAFE: SAFE_STYLE,
    WARNING: WARNING_STYLE,
    DANGER: DANGER_STYLE,
  };
  const firstCard = FIRST_CARD_CONTENT[status];
  const detailContent = DETAIL_CARD_CONTENT[categoryKey];

  const detailCards = detailContent.TEXTS.map((textData, index) => ({
    ...textData,
    image: detailContent.IMAGES[status][index],
  }));

  return {
    status,
    title: firstCard.title,
    style: statusStyles[status],
    details: {
      first: {
        image: firstCard.image,
        explain: firstCard.explain,
        footer: { header: FIRST_FOOTER_HEADER, items: FIRST_FOOTER_ITEMS },
      },
      detailCards,
    },
  };
};

export const ALL_ANALYSIS_DATA: AllAnalysisData = {
  [ANALYSIS_CATEGORY.URL]: {
    [ANALYSIS_STATUS.SAFE]: createAnalysisData("URL", "SAFE"),
    [ANALYSIS_STATUS.WARNING]: createAnalysisData("URL", "WARNING"),
    [ANALYSIS_STATUS.DANGER]: createAnalysisData("URL", "DANGER"),
  },
  // 현재 서버에서 URL과 피싱 사례 분석을 같은 값을 주고 있어서 겹치는 오류가 나서 주석 처리하였습니다.
  /*[ANALYSIS_CATEGORY.PHISHING]: {
    [ANALYSIS_STATUS.SAFE]: createAnalysisData("PHISHING", "SAFE"),
    [ANALYSIS_STATUS.WARNING]: createAnalysisData("PHISHING", "WARNING"),
    [ANALYSIS_STATUS.DANGER]: createAnalysisData("PHISHING", "DANGER"),
  },*/
  [ANALYSIS_CATEGORY.INVESTMENT]: {
    [ANALYSIS_STATUS.SAFE]: createAnalysisData("INVESTMENT", "SAFE"),
    [ANALYSIS_STATUS.WARNING]: createAnalysisData("INVESTMENT", "WARNING"),
    [ANALYSIS_STATUS.DANGER]: createAnalysisData("INVESTMENT", "DANGER"),
  },
};

export {
  ANALYSIS_STATUS,
  ANALYSIS_CATEGORY,
  STATUS_TEXT_MAP,
} from "@/constants/analyze/result/common";
