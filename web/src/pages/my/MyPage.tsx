//import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getMypageCommunityPostsManagement } from "@/apis/my/getMypageCommunityPostsManagement";
import { getMypageDashboard } from "@/apis/my/getMypageDashboard";

import { LoadingScreen } from "@/components/animation/LoadingScreen";
import { AppHeader } from "@/components/common/AppHeader";
import { MyAccount } from "@/components/my/MyAccount";
import { MyMenuItem } from "@/components/my/MyMenuItem";
import { MyProfile } from "@/components/my/MyProfile";

import { QUERY_KEYS } from "@/constants/apiConstants";
import { PAGE_PATH } from "@/constants/path";

import AddIcon from "@/assets/icons/add.svg?react";
import AnalysisIcon from "@/assets/icons/analysis.svg?react";
//import NotificationOffIcon from "@/assets/icons/notification_off.svg?react";
import TermsIcon from "@/assets/icons/terms.svg?react";
import WriteIcon from "@/assets/icons/write.svg?react";

export const MyPage = () => {
  const navigate = useNavigate();

  // const [isToggleOn, setIsToggleOn] = useState(false);

  const { data: myInfo, isLoading: isDashboardLoading } = useQuery({
    queryKey: [QUERY_KEYS.MYPAGE_DASHBOARD],
    queryFn: getMypageDashboard,
    staleTime: 5 * 60 * 1000,
  });

  const { data: myPosts, isLoading: isPostsLoading } = useQuery({
    queryKey: [QUERY_KEYS.MYPAGE_POST],
    queryFn: getMypageCommunityPostsManagement,
    staleTime: 5 * 60 * 1000,
  });

  if (isDashboardLoading || isPostsLoading || !myInfo || !myPosts) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AppHeader title="My" onNotification={() => {}} className="bg-bg-100" />
      <div className="px-5">
        <MyProfile myInfo={myInfo.userInfo} />
        <div>
          <span className="text-base-0 mr-2.5">작성글</span>
          <span className="text-gray-system-600">{myPosts?.totalPosts}</span>
        </div>

        <button
          onClick={() => navigate(PAGE_PATH.COMMUNITY.SPECIFIC.WRITE)}
          className="text-primary-400 active:bg-primary-0 mt-[0.8125rem] flex h-[50px] w-full items-center justify-center gap-1 rounded-xl border"
          aria-label="글 작성하기"
        >
          <AddIcon className="fill-primary-400 rotate-45" aria-hidden="true" />
          글 작성하기
        </button>

        <div className="mt-[1.375rem]">
          <MyMenuItem
            icon={<WriteIcon className="h-6 w-6" />}
            label="작성글 보기"
            type="link"
            onClick={() => navigate(PAGE_PATH.MY.SPECIFIC.POSTS)}
            className="rounded-t-xl"
            aria-label="작성글 보기"
          />
          {/**
           * TODO: @Tifsy 2차 배포 수정 예정 
          <MyMenuItem
            icon={<NotificationOffIcon className="h-6 w-6" />}
            label="알림 설정"
            type="toggle"
            className="active:bg-gray-system-800"
            aria-label="알림 설정"
            isToggled={isToggleOn}
            onToggle={() => setIsToggleOn((prev) => !prev)}
          />
           */}
          <MyMenuItem
            icon={<AnalysisIcon />}
            label="분석 내역 보기"
            type="link"
            onClick={() => navigate(PAGE_PATH.MY.SPECIFIC.ANALYSIS)}
            aria-label="분석 내역 보기"
          />
          <MyMenuItem
            icon={<TermsIcon />}
            label="이용약관"
            type="link"
            onClick={() => navigate(PAGE_PATH.MY.SPECIFIC.TERMS)}
            className="rounded-b-xl"
            aria-label="이용약관"
          />
        </div>

        <MyAccount />
      </div>
    </>
  );
};
