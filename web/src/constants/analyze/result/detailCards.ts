import dangerFishing1 from "@/assets/images/result/danger_fishing_1.svg";
import dangerFishing2 from "@/assets/images/result/danger_fishing_2.svg";
import dangerInvest1 from "@/assets/images/result/danger_invest_1.svg";
import dangerInvest2 from "@/assets/images/result/danger_invest_2.svg";
import dangerInvest3 from "@/assets/images/result/danger_invest_3.svg";
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

export const DETAIL_CARD_CONTENT = {
  URL: {
    TEXTS: COMMON_URL_FISHING_DETAILS_TEXT,
    IMAGES: {
      SAFE: [safeFishing1, safeFishing2],
      WARNING: [warnFishing1, warnFishing2],
      DANGER: [dangerFishing1, dangerFishing2],
    },
  },
  PHISHING: {
    TEXTS: COMMON_URL_FISHING_DETAILS_TEXT,
    IMAGES: {
      SAFE: [safeFishing1, safeFishing2],
      WARNING: [warnFishing1, warnFishing2],
      DANGER: [dangerFishing1, dangerFishing2],
    },
  },
  INVESTMENT: {
    TEXTS: INVESTMENT_DETAILS_TEXT,
    IMAGES: {
      SAFE: [safeInvest1, safeInvest2, safeInvest3],
      WARNING: [warnInvest1, warnInvest2, warnInvest3],
      DANGER: [dangerInvest1, dangerInvest2, dangerInvest3],
    },
  },
};
