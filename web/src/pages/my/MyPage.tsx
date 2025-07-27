import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

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

  return (
    <>
      <AppHeader title="My" onNotification={() => {}} />
      <div className="px-5">
        <MyProfile />

        <div>
          <span className="text-base-0 mr-2.5">작성글</span>
          <span className="text-gray-system-600">243</span>
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
    </>
  );
};
