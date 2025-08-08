export const REPORT_REASONS = [
  "허위 정보 또는 조작된 내용",
  "혐오 표현 또는 차별적 발언",
  "개인정보 노출",
  "중복 또는 도배성 게시글",
  "상업적 광고 또는 홍보성 콘텐츠",
  "기타 커뮤니티 운영 방침 위반",
];
export const REPORT_REASON_MAP: Record<string, ReportType> = {
  "허위 정보 또는 조작된 내용": "FAKE",
  "혐오 표현 또는 차별적 발언": "HATE",
  "개인정보 노출": "PRIVACY",
  "중복 또는 도배성 게시글": "SPAM",
  "상업적 광고 또는 홍보성 콘텐츠": "AD",
  "기타 커뮤니티 운영 방침 위반": "POLICY",
};

export type ReportType = "FAKE" | "HATE" | "PRIVACY" | "SPAM" | "AD" | "POLICY";
