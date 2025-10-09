import type { HomeBannerData } from "@/types/home/home.types";

import { PAGE_PATH } from "@/constants/path";

import cutting_LV01 from "@/assets/cuttings/cutting_Lv01.png";
import cutting_LV02 from "@/assets/cuttings/cutting_Lv02.png";
import cutting_LV03 from "@/assets/cuttings/cutting_Lv03.png";
import cutting_LV04 from "@/assets/cuttings/cutting_Lv04.png";
import ai_banner from "@/assets/icons/ai_banner.svg";
import article_banner from "@/assets/icons/article_banner.svg";

export const HOME_BANNER_DATA: HomeBannerData[] = [
  {
    bannerId: 1,
    title: "커팅이랑 사기뉴스 보기",
    content: "최근 사기 방식을 알려줄게요",
    image: article_banner,
    navigate: PAGE_PATH.CONTENT.BASE,
  },
  {
    bannerId: 2,
    title: "AI 분석? 커팅이가 알려드려요!",
    content: "5초 안에 분석하는 AI 가이드",
    image: ai_banner,
    navigate: PAGE_PATH.ANALYZE.SPECIFIC.GUIDE,
  },
];
export const LEVEL_DATA_MAP = new Map<number, { name: string; image: string }>([
  [1, { name: "LV.1 탐지 훈련", image: cutting_LV01 }],
  [2, { name: "LV.2 1등 탐지견", image: cutting_LV02 }],
  [3, { name: "LV.3 멍탐정 커팅", image: cutting_LV03 }],
  [4, { name: "LV.4 커팅의 제왕", image: cutting_LV04 }],
]);
