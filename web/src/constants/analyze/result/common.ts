import type { ResultCardStyle } from "@/types/analyzeResult/analyzeResult.types";

export const ANALYSIS_STATUS = {
  SAFE: "SAFE",
  WARNING: "WARNING",
  DANGER: "DANGER",
  UNKNOWN: "UNKNOWN",
} as const;

export const ANALYSIS_CATEGORY = {
  URL: "PHISHING",
  FISHING: "PHISHING",
  INVESTMENT: "NORMAL",
} as const;

export const STATUS_TEXT_MAP = {
  [ANALYSIS_STATUS.SAFE]: "양호",
  [ANALYSIS_STATUS.WARNING]: "주의",
  [ANALYSIS_STATUS.DANGER]: "위험",
  [ANALYSIS_STATUS.UNKNOWN]: "분석 불가",
};

export const SAFE_STYLE: ResultCardStyle = {
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

export const WARNING_STYLE: ResultCardStyle = {
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

export const DANGER_STYLE: ResultCardStyle = {
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

export const UNKNOWN_STYLE: ResultCardStyle = {
  background:
    "bg-linear-[180deg,rgba(125,81,255,0.2)_0%,rgba(73,48,147,0.1)_30%,rgba(73,48,147,0.1)_78.11%,rgba(73,48,147,0.2)_100%]",
  statusBackground: "bg-[#362c5e]",
  cardBackground:
    "bg-linear-[158deg,rgba(73,48,147,0.35)_2.67%,rgba(73,48,147,0.23)_34.34%,rgba(73,48,147,0.14)_104.73%]",
  cardInnerBackground: "bg-[#4c4e78]/20",
  borderColor: "border-[#a15eff]/20",
  primaryColor: "text-[#b5a3f5]",
  indicatorColor: "bg-[#362c5e]",
  questionColor: "text-[#362c5e]",
};
