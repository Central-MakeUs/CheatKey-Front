import { useCallback, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { motion, useAnimation } from "framer-motion";

import { getPlatform } from "@/utils/getPlatform";

import { BottomNavBarItem } from "@/components/common/BottomNavBarItem";
import { TooltipBubble } from "@/components/common/TooltipBubble";

import { PAGE_PATH } from "@/constants/route/path";

import { cn } from "@/lib/cn";

import AiAnalysisIcon from "@/assets/icons/ai_analysis.svg?react";
import CommunityIcon from "@/assets/icons/community.svg?react";
import ActiveCommunityIcon from "@/assets/icons/community_active.svg?react";
import ContentIcon from "@/assets/icons/content.svg?react";
import ActiveContentIcon from "@/assets/icons/content_active.svg?react";
import HomeIcon from "@/assets/icons/home.svg?react";
import ActiveHomeIcon from "@/assets/icons/home_active.svg?react";
import MyIcon from "@/assets/icons/my.svg?react";
import ActiveMyIcon from "@/assets/icons/my_active.svg?react";

const BUBBLE_STORAGE_KEY = "hasClosedAIBubble";

export const BottomNavBar = () => {
  const navigate = useNavigate();
  const analyzeIconControls = useAnimation();
  const location = useLocation();

  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  const isHomePage = location.pathname === PAGE_PATH.HOME;

  const handleCloseBubble = useCallback(() => {
    setIsBubbleVisible(false);
    localStorage.setItem(BUBBLE_STORAGE_KEY, "true");
  }, []);

  const handleAnalyzeIconClick = useCallback(async () => {
    await analyzeIconControls.start({
      y: [0, -10, 0, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    });
    navigate(PAGE_PATH.ANALYZE.BASE);
  }, [analyzeIconControls, navigate]);

  useEffect(() => {
    const hasClosed = localStorage.getItem(BUBBLE_STORAGE_KEY);

    if (isHomePage && hasClosed !== "true") {
      setIsBubbleVisible(true);
    } else {
      setIsBubbleVisible(false);
    }
  }, [isHomePage]);

  return (
    <nav
      className="absolute bottom-0 z-50 w-full max-w-3xl rounded-t-2xl shadow-[0_-4px_5px_0_rgba(39,61,174,0.1)]"
      style={{
        background: `radial-gradient(circle at center 2px, transparent 36px, #2C2D30 36px)`,
      }}
    >
      <div
        className={cn("flex items-center justify-around px-2", {
          "h-26 pb-5": getPlatform() === "ios",
          "h-21 pb-0": getPlatform() !== "ios",
        })}
      >
        <div className="absolute top-0 left-1/2 z-0 h-[35px] w-[70px] -translate-x-1/2 rounded-b-full" />
        <BottomNavBarItem
          path={PAGE_PATH.HOME}
          DefaultIcon={HomeIcon}
          ActiveIcon={ActiveHomeIcon}
          label="홈"
        />
        <BottomNavBarItem
          path={PAGE_PATH.CONTENT.BASE}
          DefaultIcon={ContentIcon}
          ActiveIcon={ActiveContentIcon}
          label="콘텐츠"
        />

        <div className="relative z-20 translate-y-[-40px]">
          <motion.div
            className="rounded-full shadow-[0_4px_15px_0_rgba(0,89,255,0.3)]"
            animate={analyzeIconControls}
            onClick={handleAnalyzeIconClick}
            role="button"
            aria-label="AI 분석 이동"
          >
            <AiAnalysisIcon className="h-15 w-15" />
          </motion.div>

          <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 -translate-y-5">
            <TooltipBubble
              isOpen={isBubbleVisible}
              onClose={handleCloseBubble}
              placement={"bottom"}
            >
              <p className="whitespace-nowrap">AI로 분석하기</p>
            </TooltipBubble>
          </div>
        </div>

        <BottomNavBarItem
          path={PAGE_PATH.COMMUNITY.SPECIFIC.FEED}
          DefaultIcon={CommunityIcon}
          ActiveIcon={ActiveCommunityIcon}
          label="커뮤니티"
        />
        <BottomNavBarItem
          path={PAGE_PATH.MY.BASE}
          DefaultIcon={MyIcon}
          ActiveIcon={ActiveMyIcon}
          label="My"
        />
      </div>
    </nav>
  );
};
