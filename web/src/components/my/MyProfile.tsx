//import { useNavigate } from "react-router-dom";

//import { path } from "@/routes/path";

import type { MyInfo } from "@/types/my/my.types";

import { NameTag } from "@/components/common/NameTag";

import { LEVEL_DATA_MAP } from "@/constants/homePageConstants";

//import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";

interface MyProfileProps {
  myInfo: MyInfo;
}

export const MyProfile = ({ myInfo }: MyProfileProps) => {
  //  const navigate = useNavigate();

  const level = myInfo?.level ?? 1;
  const levelInfo = LEVEL_DATA_MAP.get(level);
  const levelName = levelInfo?.name ?? `LV.${myInfo?.level} 측정 불가`;

  return (
    <div className="mt-16 mb-[1.875rem] flex items-center gap-[27px]">
      <img
        src={myInfo?.profileImageUrl}
        alt="유저의 프로필 사진"
        className="h-25 w-25 rounded-full"
      />
      <div className="flex flex-col">
        <NameTag type="home" name={levelName} />
        <div className="mt-3 flex items-center gap-2">
          <h1 className="head-3-bold text-base-0 truncate">
            {myInfo?.nickname}
          </h1>
          {/**
           * TODO: @Tifsy 추후 2차 배포 수정 예정
          <button
            aria-label="프로필 수정하기"
            onClick={() => navigate(path.my.edit)}
          >
            <ArrowRightIcon className="text-gray-system-700 h-5 w-5" />
          </button>
           */}
        </div>

        <p className="body-5-regular text-gray-system-200 mt-2">
          오늘의 방문횟수 {myInfo?.totalVisitCount}회
        </p>
      </div>
    </div>
  );
};
