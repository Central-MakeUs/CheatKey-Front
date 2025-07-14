import { useState } from "react";

import { Link } from "react-router-dom";

import type {
  HomeBannerData,
  HomeTrendingPostData,
} from "@/types/home/home.types";

import { NameTag } from "@/components/common/NameTag";
import SearchBar from "@/components/common/SearchBar";
import { HomeBannerList } from "@/components/home/HomeBannerList";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeTrendingPost } from "@/components/home/HomeTrendingPost";

import cutting_lv1 from "@/assets/cuttings/cutting_Lv01.svg";
import ai_banner from "@/assets/icons/ai-banner.svg";
import article_banner from "@/assets/icons/article-banner.svg";
import default_img from "@/assets/icons/temporary_profile_pic.png";

export const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const homeBannerDummyData: HomeBannerData[] = [
    {
      title: "커팅이랑 사기뉴스 보기",
      content: "최근 사기 방식을 알려줄게요",
      image: article_banner,
      onNavigate: () => console.log("아티클"),
    },
    {
      title: "AI 분석? 커팅이가 알려드려요!",
      content: "5초 안에 분석하는 AI 가이드",
      image: ai_banner,
      onNavigate: () => console.log("AI 분석"),
    },
  ];
  const homeTrendingPostDummyData: HomeTrendingPostData[] = [
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

  return (
    <main className="flex flex-1 flex-col bg-gradient-to-b from-[rgba(11,49,255,0.3)] via-[rgba(31,32,47,0)] via-45% to-[rgba(11,49,255,0.09)]">
      {/* 로고와 알림 */}
      <HomeHeader />
      {/* 검색 창 */}
      <div className="px-5">
        <SearchBar
          placeholder="사기 사례를 검색해주세요."
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
        />
      </div>
      {/* 커팅이 사진과 닉네임 영역 */}
      <div className="mt-[1.125rem] flex items-center gap-6 px-5">
        <img
          src={cutting_lv1}
          className="border-primary-600/40 h-[8.125rem] w-[8.125rem] rounded-full border-[0.5px]"
        />
        <div className="flex flex-col">
          <NameTag type="home" name="LV.1 탐지 훈련" />
          <h1 className="head-3-bold text-base-0 mt-2.5 truncate">
            아기냉미녀
            <span className="head-4-semibold text-gray-system-100 ml-0.5">
              님
            </span>
          </h1>
          <h2 className="body-5-regular text-gray-system-300 mt-1">
            오늘의 방문횟수 0회
          </h2>
        </div>
      </div>
      {/* 배너 영역 */}
      <section className="border-b-bg-50 mx-5 border-b py-9 pt-7">
        <HomeBannerList banners={homeBannerDummyData} />
      </section>
      {/* 인기 게시글 영역 */}
      <section className="mt-[1.375rem] flex w-full flex-col">
        <div className="flex w-full items-center justify-between px-5">
          <h1 className="body-1-bold text-gray-system-50">
            현재 인기 있는 게시글
          </h1>
          <Link to={"/"} className="caption-1-medium text-gray-system-600">
            더보기
          </Link>
        </div>
        <p className="caption-2-regular text-gray-system-400 mt-1 w-full px-5">
          커뮤니티에서 다양한 사기 사례를 볼 수 있어요
        </p>
        <div className="relative mt-5 flex w-full gap-3.5 overflow-x-auto px-5">
          {homeTrendingPostDummyData.map((data, index) => (
            <HomeTrendingPost {...data} key={`home-trending-${index}`} />
          ))}
        </div>
      </section>
    </main>
  );
};
