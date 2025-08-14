import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { path } from "@/routes/path";

import { getHomeDashboard } from "@/apis/home/getHomeDashboard";

import { ConfettiExplosion } from "@/components/animation/ConfettiExplosion";
import { LoadingSpinner } from "@/components/animation/LoadingSpinner";
import { ConfirmModal } from "@/components/common/ConfirmModal";
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

import GoodCutting from "@/assets/images/cutting_good.svg?react";

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // TODO: @Ki-Tak 추후, 로딩 및 에러 + staleTime 정해지면 변경해야함
  const { data: dashboardData } = useQuery({
    queryKey: [QUERY_KEYS.HOME_DASHBOARD],
    queryFn: getHomeDashboard,
  });

  const handleConfirmWelcome = () => {
    setShowWelcomeModal(false);
    setShowWelcomeAnimation(false);
  };

  useEffect(() => {
    const isFromSignup = location.state?.fromSignup;

    if (isFromSignup && dashboardData) {
      setTimeout(() => {
        setShowWelcomeAnimation(true);
      }, 200);

      setShowWelcomeModal(true);

      window.history.replaceState({}, document.title);

      setTimeout(() => {
        setShowWelcomeAnimation(false);
      }, 3200);
    }
  }, [location.state, dashboardData]);

  if (!dashboardData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[rgba(11,49,255,0.3)] via-[rgba(31,32,47,0)] via-45% to-[rgba(11,49,255,0.09)]">
        <LoadingSpinner />
      </div>
    );
  }

  const { userInfo, popularPosts } = dashboardData;

  const levelInfo = LEVEL_DATA_MAP.get(userInfo.level);

  const levelName = levelInfo?.name ?? `LV.${userInfo.level} 측정 불가`;
  return (
    <>
      <main className="safearea flex flex-1 flex-col bg-gradient-to-b from-[rgba(11,49,255,0.3)] via-[rgba(31,32,47,0)] via-45% to-[rgba(11,49,255,0.09)]">
        {/* 로고와 알림 */}
        <HomeHeader />
        {/* 검색 창 */}
        <div className="px-5">
          <SearchBarRedirect placeholder="사기 사례를 검색해주세요." />
        </div>
        {/* 커팅이 사진과 닉네임 영역 
          추후에, 서버에서 보내주는 이미지로 변경 예정
      */}
        <div className="mt-[1.125rem] flex items-center gap-6 px-5">
          <img
            src={levelInfo?.image}
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
              총 방문 횟수 {userInfo.totalVisitCount}회
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
            <a
              onClick={() => navigate(path.community.feed)}
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

      <ConfettiExplosion
        isActive={showWelcomeAnimation}
        centerX={window.innerWidth / 2}
        centerY={0}
      />

      {showWelcomeModal && (
        <ConfirmModal
          title="환영합니다"
          description={`치트키와 함께라면 사기 걱정 끝.\n똑똑하게 예방하고, 안전하게 써봐요!`}
          illustration={<GoodCutting className="h-35 w-35" />}
          confirmText="확인"
          onConfirm={handleConfirmWelcome}
          isBlur={true}
        />
      )}
    </>
  );
};
