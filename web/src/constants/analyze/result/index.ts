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
    [ANALYSIS_STATUS.SAFE]: createAnalysisData("URL_ANALYSIS", "SAFE"),
    [ANALYSIS_STATUS.WARNING]: createAnalysisData("URL_ANALYSIS", "WARNING"),
    [ANALYSIS_STATUS.DANGER]: createAnalysisData("URL_ANALYSIS", "DANGER"),
  },
  [ANALYSIS_CATEGORY.FISHING]: {
    [ANALYSIS_STATUS.SAFE]: createAnalysisData("FISHING_FRAUD", "SAFE"),
    [ANALYSIS_STATUS.WARNING]: createAnalysisData("FISHING_FRAUD", "WARNING"),
    [ANALYSIS_STATUS.DANGER]: createAnalysisData("FISHING_FRAUD", "DANGER"),
  },
  [ANALYSIS_CATEGORY.INVESTMENT]: {
    [ANALYSIS_STATUS.SAFE]: createAnalysisData("INVESTMENT_FRAUD", "SAFE"),
    [ANALYSIS_STATUS.WARNING]: createAnalysisData(
      "INVESTMENT_FRAUD",
      "WARNING",
    ),
    [ANALYSIS_STATUS.DANGER]: createAnalysisData("INVESTMENT_FRAUD", "DANGER"),
  },
};

export {
  ANALYSIS_STATUS,
  ANALYSIS_CATEGORY,
  STATUS_TEXT_MAP,
} from "@/constants/analyze/result/common";
