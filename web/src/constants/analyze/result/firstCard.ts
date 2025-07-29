import type { AnalysisFirstFooterItem } from "@/types/analyzeResult/analyzeResult.types";

import danger from "@/assets/images/result/danger.svg";
import safe from "@/assets/images/result/safe.svg";
import warning from "@/assets/images/result/warning.svg";

export const FIRST_CARD_CONTENT = {
  SAFE: {
    title: "AI 분석 결과, 대체로 안전해요.",
    explain: `위험 신호는 30% 미만이지만,\n한 번 더 확인하는 것을 권장드려요. `,
    image: safe,
  },
  WARNING: {
    title: "AI 분석 결과, 일부 위험이 존재해요.",
    explain: `분석 결과, 일부 위험 요소가 감지되어\n주의가 필요해요. 거래 전 다시 확인해 주세요. `,
    image: warning,
  },
  DANGER: {
    title: " AI 분석 결과, 안전하지 않을 수 있어요.",
    explain: `분석 결과 50% 이상으로 확인되었어요.\n위험도가 높아 주의가 필요합니다.`,
    image: danger,
  },
};

export const FIRST_FOOTER_HEADER = "* %에 따라 해당 결과가 도출됩니다.";
export const FIRST_FOOTER_ITEMS: AnalysisFirstFooterItem[] = [
  { label: "양호", value: "30% 미만" },
  { label: "주의", value: "30~50%" },
  { label: "위험", value: "50% 이상" },
];
