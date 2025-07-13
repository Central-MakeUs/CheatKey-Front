import { useState } from "react";

import { NameTag } from "@/components/common/NameTag";
import SearchBar from "@/components/common/SearchBar";
import { HomeHeader } from "@/components/home/HomeHeader";

import cutting_lv1 from "@/assets/cuttings/cutting_Lv01.svg";

export const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-[rgba(11,49,255,0.3)] via-[rgba(31,32,47,0)] via-45% to-[rgba(11,49,255,0.09)] backdrop-opacity-30">
      <HomeHeader />
      <div className="px-5">
        <SearchBar
          placeholder="사기 사례를 검색해주세요."
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
        />
      </div>
      <div className="mt-[1.125rem] flex items-center gap-6 px-5">
        <img
          src={cutting_lv1}
          className="border-primary-600/40 h-[8.125rem] w-[8.125rem] rounded-full border-[0.5px]"
        />
        <div className="flex flex-col">
          <NameTag type="home" name="LV.1 냄새만 맡아요" />
          <h1 className="head-3-bold text-base-0 mt-2.5 truncate">
            닉네임이다님
          </h1>
          <h2 className="body-5-regular text-gray-system-300 mt-1">
            오늘의 방문횟수 0회
          </h2>
        </div>
      </div>
    </div>
  );
};
