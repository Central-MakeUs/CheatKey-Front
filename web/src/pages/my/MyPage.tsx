import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

import { getMypageCommunityPostsManagement } from "@/apis/my/getMypageCommunityPostsManagement";
import { getMypageDashboard } from "@/apis/my/getMypageDashboard";
import { useMyPageStore } from "@/store/useMypageStore";
import { useMyPostsStore } from "@/store/useMyPostsStore";

import { AppHeader } from "@/components/common/AppHeader";
import { MyAccount } from "@/components/my/MyAccount";
import { MyMenuItem } from "@/components/my/MyMenuItem";
import { MyProfile } from "@/components/my/MyProfile";

import AddIcon from "@/assets/icons/add.svg?react";
import AnalysisIcon from "@/assets/icons/analysis.svg?react";
import NotificationOffIcon from "@/assets/icons/notification_off.svg?react";
import TermsIcon from "@/assets/icons/terms.svg?react";
import WriteIcon from "@/assets/icons/write.svg?react";

export const MyPage = () => {
  const navigate = useNavigate();

  const [isToggleOn, setIsToggleOn] = useState(false);

  const { myInfo, setMyDashboardData } = useMyPageStore();
  const { myPosts, setMyPosts } = useMyPostsStore();

  useEffect(() => {
    const fetchUserDashboard = async () => {
      try {
        const res = await getMypageDashboard();
        setMyDashboardData(res);
      } catch (e) {
        console.error("❌마이페이지 데이터 불러오기 실패", e);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const res = await getMypageCommunityPostsManagement();
        setMyPosts(res);
      } catch (e) {
        console.error("❌내 작성글 데이터 불러오기 실패", e);
      }
    };
    fetchUserDashboard();
    fetchUserPosts();
  }, [setMyDashboardData, setMyPosts]);

  return (
    <div className="safearea bg-bg-100 relative h-screen">
      <AppHeader title="My" onNotification={() => {}} className="bg-bg-100" />
      <div className="px-5">
        <MyProfile />

        <div>
          <span className="text-base-0 mr-2.5">작성글</span>
          <span className="text-gray-system-600">
            {myPosts?.totalPosts ?? "로딩 중.."}
          </span>
        </div>

        <button
          onClick={() => navigate(path.community.write)}
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
            onClick={() => navigate(path.my.posts)}
            className="rounded-t-xl"
            aria-label="작성글 보기"
          />
          <MyMenuItem
            icon={<NotificationOffIcon className="h-6 w-6" />}
            label="알림 설정"
            type="toggle"
            className="active:bg-gray-system-800"
            aria-label="알림 설정"
            isToggled={isToggleOn}
            onToggle={() => setIsToggleOn((prev) => !prev)}
          />
          <MyMenuItem
            icon={<AnalysisIcon />}
            label="분석 내역 보기"
            type="link"
            onClick={() => navigate(path.my.analysis)}
            aria-label="분석 내역 보기"
          />
          <MyMenuItem
            icon={<TermsIcon />}
            label="이용약관"
            type="link"
            onClick={() => navigate(path.my.terms)}
            className="rounded-b-xl"
            aria-label="이용약관"
          />
        </div>

        <MyAccount />
      </div>
    </div>
  );
};
