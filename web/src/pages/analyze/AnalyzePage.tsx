import { useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  TabSwitcher,
  type TabCategory,
} from "@/components/analyze/TabSwitcher";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomFullButton } from "@/components/common/BottomFullButton";
import { FormTextarea } from "@/components/common/FormTextarea";

import GuideIcon from "@/assets/icons/arrow_right_bold.svg?react";

const analysisTabsData = [
  {
    id: "url",
    mainHeading: "피싱 URL을 분석합니다.",
    subHeading: "분석하고 싶은 URL을 넣어보세요.",
    textareaId: "phishing-url-input",
    label: "피싱 의심 URL",
    placeholder: "URL을 복사해주세요.",
    maxLength: 100,
  },
  {
    id: "case",
    mainHeading: "비슷한 사례들을 분석합니다.",
    subHeading: "의심이 가는 글들을 복사해 보세요!",
    textareaId: "phishing-case-input",
    label: "피싱 의심 사례 텍스트",
    placeholder: "의심이 가는 텍스트를 복사해 보세요.",
    maxLength: 500,
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export const AnalyzePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabCategory>("url");
  const [inputValue, setInputValue] = useState<string>("");
  const [direction, setDirection] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLFormElement>(null);

  const currentTabInfo = analysisTabsData.find((tab) => tab.id === activeTab)!;
  const controlledPanelId = "analysis-panel";

  const handleTabChange = (tab: TabCategory) => {
    setDirection(tab === "case" ? 1 : -1);
    setActiveTab(tab);
    setInputValue("");
  };

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [activeTab]);

  return (
    <main className="relative flex h-full w-full flex-1 flex-col items-center overflow-x-hidden bg-[linear-gradient(180deg,rgba(0,40,255,0.2)_0%,rgba(34,68,109,0.1)_30%,rgba(34,68,109,0.1)_78.11%,rgba(23,40,134,0.2)_100%)] px-5">
      <AppHeader title="분석하기" onPrev={() => navigate(-1)} />
      <div className="mt-header flex w-full justify-center pt-3">
        <TabSwitcher
          activeTab={activeTab}
          onTabChange={handleTabChange}
          ariaControls={controlledPanelId}
        />
      </div>

      <div
        className="relative mt-14 w-full"
        style={{
          minHeight: contentHeight,
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.form
            key={activeTab}
            ref={contentRef}
            id={controlledPanelId}
            role="tabpanel"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            className="absolute top-0 flex w-full flex-col rounded-[1.25rem] border border-[#5C69AE]/20 bg-[linear-gradient(158deg,rgba(86,100,179,0.3)_2.67%,rgba(46,54,99,0.12)_104.73%)] px-[1.375rem] py-[2.375rem]"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(`${currentTabInfo.id} 분석하기`);
            }}
          >
            <h2 className="head-3-bold text-base-0 w-full text-center">
              {currentTabInfo.mainHeading}
            </h2>
            <h3 className="body-3-regular text-primary-100 mt-2 mb-[1.875rem] w-full text-center">
              {currentTabInfo.subHeading}
            </h3>
            <label htmlFor={currentTabInfo.textareaId} className="sr-only">
              {currentTabInfo.label}
            </label>
            <FormTextarea
              id={currentTabInfo.textareaId}
              placeholder={currentTabInfo.placeholder}
              value={inputValue}
              onChange={setInputValue}
              type="AI"
              maxLength={currentTabInfo.maxLength}
            />
            <div className="mt-[3.125rem]" />
            <BottomFullButton
              type="submit"
              content="분석하기"
              state={inputValue !== ""}
            />
          </motion.form>
        </AnimatePresence>
      </div>

      <a
        href="/"
        className="body-4-medium text-gray-system-600 absolute bottom-10 flex items-center rounded-full bg-[#3c5187]/30 px-4 py-2"
      >
        AI 분석 가이드가 궁금하다면?
        <GuideIcon
          aria-hidden="true"
          className="text-gray-system-600 h-5 w-5"
        />
      </a>
    </main>
  );
};
