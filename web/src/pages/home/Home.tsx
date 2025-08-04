import { useQuery } from "@tanstack/react-query";

import { getHomeDashboard } from "@/apis/home/getHomeDashboard";

import { NameTag } from "@/components/common/NameTag";
import { SearchBarRedirect } from "@/components/common/SearchBarRedirect";
import { HomeBannerList } from "@/components/home/HomeBannerList";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeTrendingPost } from "@/components/home/HomeTrendingPost";

import { QUERY_KEYS } from "@/constants/apiConstants";
import {
  HOME_BANNER_DATA,
  LEVEL_DATA_MAP,
} from "@/constants/homePageConstants";

export const Home = () => {
  // TODO: @Ki-Tak 추후, 로딩 및 에러 + staleTime 정해지면 변경해야함
  const { data: dashboardData } = useQuery({
    queryKey: [QUERY_KEYS.HOME_DASHBOARD],
    queryFn: getHomeDashboard,
  });

  if (!dashboardData) {
    return null;
  }

  const { userInfo, popularPosts } = dashboardData;

  const levelInfo = LEVEL_DATA_MAP.get(userInfo.level);

  const levelName = levelInfo?.name ?? `LV.${userInfo.level} 측정 불가`;
  return (
    <main className="safearea flex flex-1 flex-col bg-gradient-to-b from-[rgba(11,49,255,0.3)] via-[rgba(31,32,47,0)] via-45% to-[rgba(11,49,255,0.09)]">
      {/* 로고와 알림 */}
      <HomeHeader />
      {/* 검색 창 */}
      <div className="px-5">
        <SearchBarRedirect placeholder="사기 사례를 검색해주세요." />
      </div>
      {/* 커팅이 사진과 닉네임 영역 */}
      <div className="mt-[1.125rem] flex items-center gap-6 px-5">
        <img
          src={userInfo.profileImageUrl}
          alt="유저의 커팅이 사진"
          className="border-primary-600/40 h-[8.125rem] w-[8.125rem] rounded-full border-[0.5px]"
        />
        <div className="flex flex-col">
          <NameTag type="home" name={levelName} />
          <h1 className="head-3-bold text-base-0 mt-2.5 truncate">
            {userInfo.nickname}
            <span className="head-4-semibold text-gray-system-100 ml-0.5">
              님
            </span>
          </h1>
          <h2 className="body-5-regular text-gray-system-300 mt-1">
            오늘의 방문횟수 {userInfo.totalVisitCount}회
          </h2>
        </div>
      </div>
      {/* 배너 영역 */}
      <section className="border-b-bg-50 mx-5 border-b py-9 pt-7">
        <HomeBannerList banners={HOME_BANNER_DATA} />
      </section>
      {/* 인기 게시글 영역 */}
      <section className="mt-[1.375rem] flex w-full flex-col">
        <div className="flex w-full items-center justify-between px-5">
          <h1 className="body-1-bold text-gray-system-50">
            현재 인기 있는 게시글
          </h1>
          {/* TODO: @Ki-Tak 추후에 인기 게시글 라우팅 정해지면 변경해야함 */}
          <a
            href="/"
            aria-label="인기 게시글 더보기"
            className="caption-1-medium text-gray-system-600"
          >
            더보기
          </a>
        </div>
        <p className="caption-2-regular text-gray-system-400 mt-1 w-full px-5">
          커뮤니티에서 다양한 사기 사례를 볼 수 있어요
        </p>
        <div className="relative mt-5 flex w-full gap-3.5 overflow-x-auto px-5">
          {popularPosts.map((data, index) => (
            <HomeTrendingPost {...data} key={`home-trending-${index}`} />
          ))}
        </div>
      </section>
    </main>
  );
};
