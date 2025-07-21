import type {
  HomeBannerData,
  HomeTrendingPostData,
} from "@/types/home/home.types";

import ai_banner from "@/assets/icons/ai_banner.svg";
import article_banner from "@/assets/icons/article_banner.svg";
import default_img from "@/assets/icons/temporary_profile_pic.png";

export const homeBannerDummyData: HomeBannerData[] = [
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
export const homeTrendingPostDummyData: HomeTrendingPostData[] = [
  {
    image: default_img,
    nickname: "사기꾼",
    title: "택배 지연 문자 조심!!",
    isAuthor: false,
    content:
      "택배 지연 문자를 클릭하자 악성 앱이 설치되어 개인 정보가 유출됐어요. 조심하세요!",
  },
  {
    image: default_img,
    nickname: "피해자",
    title: "[Web발신] 저금리 대출 광고",
    isAuthor: false,
    content:
      "정부 지원 저금리 대출이라는 문자를 받고 상담했더니 수수료를 먼저 요구했습니다. 100% 사기입니다.",
  },
  {
    image: default_img,
    nickname: "예방요정",
    title: "부모님 사칭 카톡 피싱 주의보",
    isAuthor: false,
    content:
      "부모님 프로필로 '아들, 폰 고장났는데...'라며 돈을 요구하는 사례가 늘고 있어요. 꼭 전화로 확인하세요.",
  },
  {
    image: default_img,
    nickname: "알바생",
    title: "고수익 단기 알바의 함정",
    isAuthor: false,
    content:
      "고수익을 보장한다는 문자 메시지, 알고 보니 보이스피싱 현금 수거책이었습니다. 절대 속지 마세요.",
  },
];
