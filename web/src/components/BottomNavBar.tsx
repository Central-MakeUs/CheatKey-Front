import { NavLink } from "react-router-dom";

import { path } from "@/routes/path";

import CommunityIcon from "@/assets/icons/community.svg";
import CommunityFocusedIcon from "@/assets/icons/community_focused.svg";
import ContentsIcon from "@/assets/icons/contents.svg";
import ContentsFocusedIcon from "@/assets/icons/contents_focused.svg";
import HomeIcon from "@/assets/icons/home.svg";
import HomeFocusedIcon from "@/assets/icons/home_focused.svg";
import MyIcon from "@/assets/icons/my.svg";
import MyFocusedIcon from "@/assets/icons/my_focused.svg";
import AiAnalysisIcon from "@/assets/icons/ai_analysis.svg";

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
        {/* TODO: @tifsy 홈, 콘텐츠, AI 분석하기, 마이페이지 경로 수정*/}
        <NavLink to={path.home}>
          {({ isActive }) => (
            <img
              src={isActive ? HomeFocusedIcon : HomeIcon}
              alt="홈"
              className="h-15 w-15"
            />
          )}
        </NavLink>

        <NavLink to={path.home}>
          {({ isActive }) => (
            <img
              src={isActive ? ContentsFocusedIcon : ContentsIcon}
              alt="콘텐츠"
              className="h-15 w-15"
            />
          )}
        </NavLink>

        <div className="z-20 translate-y-[-40px] rounded-full shadow-[0_4px_15px_0_rgba(0,89,255,0.3)]">
          <NavLink to={path.home}>
            <img src={AiAnalysisIcon} alt="AI 분석하기" className="h-15 w-15" />
          </NavLink>
        </div>

        <NavLink to={path.community.feed}>
          {({ isActive }) => (
            <img
              src={isActive ? CommunityFocusedIcon : CommunityIcon}
              alt="커뮤니티"
              className="h-15 w-15"
            />
          )}
        </NavLink>

        <NavLink to={path.home}>
          {({ isActive }) => (
            <img
              src={isActive ? MyFocusedIcon : MyIcon}
              alt="마이페이지"
              className="h-15 w-15"
            />
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavBar;
