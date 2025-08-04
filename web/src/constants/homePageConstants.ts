import type { HomeBannerData } from "@/types/home/home.types";

import ai_banner from "@/assets/icons/ai_banner.svg";
import article_banner from "@/assets/icons/article_banner.svg";

export const HOME_BANNER_DATA: HomeBannerData[] = [
  {
    title: "커팅이랑 사기뉴스 보기",
    content: "최근 사기 방식을 알려줄게요",
    image: article_banner,
    bannerId: 1,
  },
  {
    title: "AI 분석? 커팅이가 알려드려요!",
    content: "5초 안에 분석하는 AI 가이드",
    image: ai_banner,
    bannerId: 2,
  },
];
export const LEVEL_DATA_MAP = new Map<number, { name: string }>([
  [1, { name: "LV.1 탐지 훈련" }],
  [2, { name: "LV.2 1등 탐지견" }],
  [3, { name: "LV.3 멍탐정 탐정" }],
  [4, { name: "LV.4 커팅의 제왕" }],
]);
