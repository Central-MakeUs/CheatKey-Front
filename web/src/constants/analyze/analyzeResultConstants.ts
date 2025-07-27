import type {
  CategoryAnalysisResult,
  AnalysisCategory,
  AnalysisFirstFooterItem,
  ResultCardStyle,
} from "@/types/analyzeResult/analyzeResult.types";

import danger from "@/assets/images/result/danger.svg";
import dangerFishing1 from "@/assets/images/result/danger_fishing_1.svg";
import dangerFishing2 from "@/assets/images/result/danger_fishing_2.svg";
import dangerInvest1 from "@/assets/images/result/danger_invest_1.svg";
import dangerInvest2 from "@/assets/images/result/danger_invest_2.svg";
import dangerInvest3 from "@/assets/images/result/danger_invest_3.svg";
import safe from "@/assets/images/result/safe.svg";
import safeFishing1 from "@/assets/images/result/safe_fishing_1.svg";
import safeFishing2 from "@/assets/images/result/safe_fishing_2.svg";
import safeInvest1 from "@/assets/images/result/safe_invest_1.svg";
import safeInvest2 from "@/assets/images/result/safe_invest_2.svg";
import safeInvest3 from "@/assets/images/result/safe_invest_3.svg";
import warnFishing1 from "@/assets/images/result/warn_fishing_1.svg";
import warnFishing2 from "@/assets/images/result/warn_fishing_2.svg";
import warnInvest1 from "@/assets/images/result/warn_invest_1.svg";
import warnInvest2 from "@/assets/images/result/warn_invest_2.svg";
import warnInvest3 from "@/assets/images/result/warn_invest_3.svg";
import warning from "@/assets/images/result/warning.svg";

type AllAnalysisData = Record<
  AnalysisCategory,
  Record<keyof typeof ANALYSIS_STATUS, CategoryAnalysisResult>
>;

export const ANALYSIS_STATUS = {
  SAFE: "SAFE",
  WARNING: "WARNING",
  DANGER: "DANGER",
} as const;

export const ANALYSIS_CATEGORY = {
  URL: "URL_ANALYSIS",
  FISHING: "FISHING_FRAUD",
  INVESTMENT: "INVESTMENT_FRAUD",
} as const;

export const STATUS_TEXT_MAP = {
  [ANALYSIS_STATUS.SAFE]: "양호",
  [ANALYSIS_STATUS.WARNING]: "주의",
  [ANALYSIS_STATUS.DANGER]: "위험",
};

const SAFE_TITLE = "AI 분석 결과, 대체로 안전해요.";
const WARNING_TITLE = "AI 분석 결과, 일부 위험이 존재해요.";
const DANGER_TITLE = " AI 분석 결과, 안전하지 않을 수 있어요.";

const FIRST_SAFE_EXPLAIN = `위험 신호는 30% 미만이지만,
한 번 더 확인하는 것을 권장드려요. 
`;
const FIRST_WARNING_EXPLAIN = `분석 결과, 일부 위험 요소가 감지되어
주의가 필요해요. 거래 전 다시 확인해 주세요. 
`;
const FIRST_DANGER_EXPLAIN = `분석 결과 50% 이상으로 확인되었어요.
위험도가 높아 주의가 필요합니다.
`;

const FIRST_FOOTER_HEADER = "* %에 따라 해당 결과가 도출됩니다.";
const FIRST_FOOTER_ITEMS: AnalysisFirstFooterItem[] = [
  { label: "양호", value: "30% 미안" },
  { label: "주의", value: "30~ 50%" },
  { label: "위험", value: "50% 이상" },
];

const SAFE_STYLE: ResultCardStyle = {
  background:
    "bg-linear-[180deg,rgba(0,40,255,0.2)_0%,rgba(34,68,109,0.1)_30%,rgba(34,68,109,0.1)_78.11%,rgba(23,40,134,0.2)_100%]",
  statusBackground: "bg-[#0d153c]/40",
  cardBackground:
    "bg-linear-[158deg,rgba(86,100,179,0.35)_2.67%,rgba(46,54,99,0.14)_104.73%]",
  cardInnerBackground: "bg-[#3c5187]/20",
  borderColor: "border-[#5c69ae]/20",
  primaryColor: "text-primary-300",
  indicatorColor: "bg-primary-400",
  questionColor: "text-primary-100",
};
const WARNING_STYLE: ResultCardStyle = {
  background:
    "bg-linear-[180deg,rgba(180,42,42,0.2)_0%,rgba(34,68,109,0.1)_30%,rgba(34,68,109,0.1)_78.11%,rgba(23,40,134,0.2)_100%]",
  statusBackground: "bg-[#2d0808]/40",
  cardBackground:
    "bg-linear-[158deg,rgba(150,38,40,0.35)_2.67%,rgba(93,47,72,0.23)_34.34%,rgba(46,54,99,0.14)_104.73%]",
  cardInnerBackground: "bg-[#5b404b]/20",
  borderColor: "border-[#7e5959]/20",
  primaryColor: "text-error-100",
  indicatorColor: "bg-[#973c3c]",
  questionColor: "text-[#ffeaea]",
};
const DANGER_STYLE: ResultCardStyle = {
  background:
    "bg-linear-[180deg,rgba(178,31,31,0.2)_0%,rgba(105,67,67,0.1)_30%,rgba(105,67,67,0.1)_78.11%,rgba(66,18,18,0.2)_100%]",
  statusBackground: "bg-[#280e0e]/40",
  cardBackground:
    "bg-linear-[158deg,rgba(151,51,52,0.35)_2.67%,rgba(46,57,99,0.14)_104.73%]",
  cardInnerBackground: "bg-[#623434]/20",
  borderColor: "border-[#7e5959]/20",
  primaryColor: "text-error-50",
  indicatorColor: "bg-error-100",
  questionColor: "text-[#fff2f2]",
};

const COMMON_URL_FISHING_DETAILS_TEXT = [
  {
    question: "Q. 피싱 사기의 피해 이유는?",
    answer: `신뢰할 만한 인물 사칭\n(38.4%)`,
    explain:
      "주요 피해 이유는 ‘신뢰할 만한 인물 사칭’(38.4%),‘긴급성·공포감 조성’ (26.9%), ‘인식 부족’(18.8%), ‘기술·기법 무지’ (15.1%)로 나타났습니다.",
    footer: "전기통신금융사기 피해현황 실태조사(25.02.27)",
  },
  {
    question: "Q. 피싱 사기에 가장 많은 유형은?",
    answer: "기관 사칭형 (36.1%)",
    explain:
      "기관 사칭형이 36.1%로 가장 많았으며, 메신저 피싱 25.6%, 대출사기형 19.7%, 스미싱 13.6% 순으로 나타났습니다.",
    footer: "전기통신 금융 사기 피해 현황 실태조사 (25.02.27)",
  },
];

const INVESTMENT_DETAILS_TEXT = [
  {
    question: "Q. 가상자산 시장과 관련한 범죄는?",
    answer: `신뢰할 만한 인물 사칭\n(38.4%)`,
    explain:
      "지난해 가상자산 불법행위 검거 건수와 인원은 전년 대비 각각 1.9배, 2.4배 증가했으며, 2017년 대비 각각 11.8배, 17.4배 폭증해 최고치를 기록했습니다.",
    footer: "경찰청 (2025.05.18)",
  },
  {
    question: "Q. 중고 거래 분쟁 건수",
    answer: "8배 증가",
    explain:
      "중고 거래 분쟁은 2019년 535건에서 2024년 4200만 건으로 급증했으며, 피해자와 피의자의 약 75%가 MZ세대입니다.",
    footer: "한국인터넷진흥원 (2024.04)",
  },
  {
    question: "Q. 피싱 사기의 피해 이유는?",
    answer: `1위 티켓,상품권`,
    explain:
      "티켓·상품권 3만8413, 계정 3만4717, 휴대폰 2만6311, 화폐 1만9444, 포인트 1만7322, 게임 아이템 1만7245, 패션·의류 1만6224에 달합니다.",
    footer: "한국인터넷진흥원 (2024.04)",
  },
];

interface StatusValue {
  title: string;
  style: ResultCardStyle;
  explain: string;
}

const createAnalysisData = (
  status: keyof typeof ANALYSIS_STATUS,
  firstCardImage: string,
  detailTexts: typeof COMMON_URL_FISHING_DETAILS_TEXT,
  detailCardImages: string[],
): CategoryAnalysisResult => {
  const statusMap: Record<keyof typeof ANALYSIS_STATUS, StatusValue> = {
    [ANALYSIS_STATUS.SAFE]: {
      title: SAFE_TITLE,
      style: SAFE_STYLE,
      explain: FIRST_SAFE_EXPLAIN,
    },
    [ANALYSIS_STATUS.WARNING]: {
      title: WARNING_TITLE,
      style: WARNING_STYLE,
      explain: FIRST_WARNING_EXPLAIN,
    },
    [ANALYSIS_STATUS.DANGER]: {
      title: DANGER_TITLE,
      style: DANGER_STYLE,
      explain: FIRST_DANGER_EXPLAIN,
    },
  };

  const { title, style, explain } = statusMap[status];

  const detailCards = detailTexts.map((textData, index) => ({
    ...textData,
    image: detailCardImages[index],
  }));

  return {
    status,
    title,
    style,
    details: {
      first: {
        image: firstCardImage,
        explain,
        footer: { header: FIRST_FOOTER_HEADER, items: FIRST_FOOTER_ITEMS },
      },
      detailCards,
    },
  };
};

export const ALL_ANALYSIS_DATA: AllAnalysisData = {
  [ANALYSIS_CATEGORY.URL]: {
    [ANALYSIS_STATUS.SAFE]: createAnalysisData(
      ANALYSIS_STATUS.SAFE,
      safe,
      COMMON_URL_FISHING_DETAILS_TEXT,
      [safeFishing1, safeFishing2],
    ),
    [ANALYSIS_STATUS.WARNING]: createAnalysisData(
      ANALYSIS_STATUS.WARNING,
      warning,
      COMMON_URL_FISHING_DETAILS_TEXT,
      [warnFishing1, warnFishing2],
    ),
    [ANALYSIS_STATUS.DANGER]: createAnalysisData(
      ANALYSIS_STATUS.DANGER,
      danger,
      COMMON_URL_FISHING_DETAILS_TEXT,
      [dangerFishing1, dangerFishing2],
    ),
  },
  [ANALYSIS_CATEGORY.FISHING]: {
    [ANALYSIS_STATUS.SAFE]: createAnalysisData(
      ANALYSIS_STATUS.SAFE,
      safe,
      COMMON_URL_FISHING_DETAILS_TEXT,
      [safeFishing1, safeFishing2],
    ),
    [ANALYSIS_STATUS.WARNING]: createAnalysisData(
      ANALYSIS_STATUS.WARNING,
      warning,
      COMMON_URL_FISHING_DETAILS_TEXT,
      [warnFishing1, warnFishing2],
    ),
    [ANALYSIS_STATUS.DANGER]: createAnalysisData(
      ANALYSIS_STATUS.DANGER,
      danger,
      COMMON_URL_FISHING_DETAILS_TEXT,
      [dangerFishing1, dangerFishing2],
    ),
  },
  [ANALYSIS_CATEGORY.INVESTMENT]: {
    [ANALYSIS_STATUS.SAFE]: createAnalysisData(
      ANALYSIS_STATUS.SAFE,
      safe,
      INVESTMENT_DETAILS_TEXT,
      [safeInvest1, safeInvest2, safeInvest3],
    ),
    [ANALYSIS_STATUS.WARNING]: createAnalysisData(
      ANALYSIS_STATUS.WARNING,
      warning,
      INVESTMENT_DETAILS_TEXT,
      [warnInvest1, warnInvest2, warnInvest3],
    ),
    [ANALYSIS_STATUS.DANGER]: createAnalysisData(
      ANALYSIS_STATUS.DANGER,
      danger,
      INVESTMENT_DETAILS_TEXT,
      [dangerInvest1, dangerInvest2, dangerInvest3],
    ),
  },
};
