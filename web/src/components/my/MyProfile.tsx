import { NameTag } from "@/components/common/NameTag";

import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";
import TemporaryProfileImage from "@/assets/icons/temporary_profile_pic.svg";

export const MyProfile = () => {
  return (
    <div className="mt-[4rem] mb-[1.875rem] flex items-center gap-[27px]">
      <img
        src={TemporaryProfileImage}
        alt="유저의 프로필 사진"
        className="h-25 w-25 rounded-full"
      />
      <div className="flex flex-col">
        <NameTag type="home" name="LV.1 탐지 훈련" />
        <div className="mt-3 flex items-center gap-2">
          <h1 className="head-3-bold text-base-0 truncate">닉네임5자</h1>
          <button aria-label="프로필 수정하기">
            <ArrowRightIcon />
          </button>
        </div>

        <h2 className="body-5-regular text-gray-system-200 mt-2">
          오늘의 방문횟수 389회
        </h2>
      </div>
    </div>
  );
};
