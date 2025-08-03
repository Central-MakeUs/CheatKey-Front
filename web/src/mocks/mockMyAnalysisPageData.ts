import type { MyAnalysisItem } from "@/types/my/my.types";

export const mockMyAnalysisPageData: MyAnalysisItem[] = [
  {
    id: "1",
    level: "양호",
    analysisType: "URL 분석",
    content: "http://k-banking.kr-userhelp.com/login",
    detectedAt: "2025.03.17",
  },
  {
    id: "2",
    level: "주의",
    analysisType: "텍스트 분석",
    content:
      "중고나라에서 게임기를 산다고 선입금했는데, 입금 후 연락이 끊겼습니다.",
    detectedAt: "2025.04.20",
  },
  {
    id: "3",
    level: "위험",
    analysisType: "URL 분석",
    content: "http://coupang-event.winner-kr.net",
    detectedAt: "2025.06.30",
  },
  {
    id: "4",
    level: "양호",
    analysisType: "URL 분석",
    content: "http://banking-kb-card.support.kr/login",
    detectedAt: "2025.08.09",
  },
  {
    id: "5",
    level: "양호",
    analysisType: "URL 분석",
    content: "https://secure-update-paypal.com/auth",
    detectedAt: "2025.04.10",
  },
];
