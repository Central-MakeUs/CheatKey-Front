import { NavLink } from "react-router-dom";

import { path } from "@/routes/path";

import AiAnalysisIcon from "@/assets/icons/ai_analysis.svg?react";
import CommunityIcon from "@/assets/icons/community.svg?react";
import CommunityFocusedIcon from "@/assets/icons/community_focused.svg?react";
import ContentsIcon from "@/assets/icons/contents.svg?react";
import ContentsFocusedIcon from "@/assets/icons/contents_focused.svg?react";
import HomeIcon from "@/assets/icons/home.svg?react";
import HomeFocusedIcon from "@/assets/icons/home_focused.svg?react";
import MyIcon from "@/assets/icons/my.svg?react";
import MyFocusedIcon from "@/assets/icons/my_focused.svg?react";

const BottomNavBar = () => {
  return (
    <nav
      className="fixed bottom-0 z-50 w-full rounded-t-2xl shadow-[0_-4px_5px_0_rgba(39,61,174,0.1)]"
      style={{
        background: `radial-gradient(circle at center 2px, transparent 36px, #2C2D30 36px)`,
      }}
    >
      <div className="flex h-21 items-center justify-around px-2">
        <div className="absolute top-0 left-1/2 z-0 h-[35px] w-[70px] -translate-x-1/2 rounded-b-full" />

        {/* TODO: @tifsy 홈, 콘텐츠, AI 분석하기, 마이페이지 경로 수정 */}
        <NavLink to={path.home}>
          {({ isActive }) =>
            isActive ? (
              <HomeFocusedIcon className="h-15 w-15" />
            ) : (
              <HomeIcon className="h-15 w-15" />
            )
          }
        </NavLink>

        <NavLink to={path.home}>
          {({ isActive }) =>
            isActive ? (
              <ContentsFocusedIcon className="h-15 w-15" />
            ) : (
              <ContentsIcon className="h-15 w-15" />
            )
          }
        </NavLink>

        <div className="z-20 translate-y-[-40px] rounded-full shadow-[0_4px_15px_0_rgba(0,89,255,0.3)]">
          <NavLink to={path.home}>
            <AiAnalysisIcon className="h-15 w-15" />
          </NavLink>
        </div>

        <NavLink to={path.community.feed}>
          {({ isActive }) =>
            isActive ? (
              <CommunityFocusedIcon className="h-15 w-15" />
            ) : (
              <CommunityIcon className="h-15 w-15" />
            )
          }
        </NavLink>

        <NavLink to={path.home}>
          {({ isActive }) =>
            isActive ? (
              <MyFocusedIcon className="h-15 w-15" />
            ) : (
              <MyIcon className="h-15 w-15" />
            )
          }
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavBar;
