import { useState } from "react";

import type { HomeBannerData } from "@/types/home/home.types";

import { NameTag } from "@/components/common/NameTag";
import SearchBar from "@/components/common/SearchBar";
import { HomeBannerList } from "@/components/home/HomeBannerList";
import { HomeHeader } from "@/components/home/HomeHeader";

import cutting_lv1 from "@/assets/cuttings/cutting_Lv01.svg";
import ai_banner from "@/assets/icons/ai-banner.svg";
import article_banner from "@/assets/icons/article-banner.svg";

export const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const homeBannerDummyData: HomeBannerData[] = [
    {
      title: "사기 방지 아티클 보러가기",
      content: "최근 나타난 사기 방식을 알려줄게요",
      image: article_banner,
      onNavigate: () => console.log("아티클"),
    },
    {
      title: "AI 분석? 커팅이가 알려드려요!",
      content: "5초 안에 분석하는 사기 방지 가이드",
      image: ai_banner,
      onNavigate: () => console.log("AI 분석"),
    },
  ];
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-[rgba(11,49,255,0.3)] via-[rgba(31,32,47,0)] via-45% to-[rgba(11,49,255,0.09)]">
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
    </div>
  );
};
