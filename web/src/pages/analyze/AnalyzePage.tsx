import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useBackgroundColor } from "@/contexts/BackgroundColorContext";
import { useAnalyzePage } from "@/hooks/analyze/useAnalyzePage";

import { AnalyzeLoading } from "@/components/analyze/AnalyzeLoading";
import { TabSwitcher } from "@/components/analyze/TabSwitcher";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomFullButton } from "@/components/common/BottomFullButton";
import { FormTextarea } from "@/components/common/FormTextarea";
import { Toast } from "@/components/common/Toast";

import { PAGE_PATH } from "@/constants/route/path";

import GuideIcon from "@/assets/icons/arrow_right_bold.svg?react";

export const AnalyzePage = () => {
  const { setBgColor } = useBackgroundColor();
  const {
    activeTab,
    inputValue,
    setInputValue,
    currentTabInfo,
    controlledPanelId,
    isAnalyzePending,
    isAnalyzeSuccess,
    isButtonEnabled,
    handleNavigateBack,
    handleTabChange,
    handleSubmit,
    toastInfo,
  } = useAnalyzePage();

  useEffect(() => {
    setBgColor(
      "bg-gradient-to-b from-[rgba(11,49,255,0.3)] via-[rgba(31,32,47,0)] via-45% to-[rgba(11,49,255,0.09)]",
    );
    return () => {
      setBgColor("bg-bg-100");
    };
  }, [setBgColor]);

  if (isAnalyzePending || isAnalyzeSuccess) {
    return <AnalyzeLoading />;
  }

  return (
    <div className="flex flex-1 flex-col items-center px-5">
      <AppHeader title="분석하기" onPrev={handleNavigateBack} />
      <div className="mt-header flex w-full justify-center pt-3">
        <TabSwitcher
          activeTab={activeTab}
          onTabChange={handleTabChange}
          ariaControls={controlledPanelId}
        />
      </div>
      <form
        id={controlledPanelId}
        role="tabpanel"
        className="mt-14 flex w-full flex-col rounded-[1.25rem] border border-[#5C69AE]/20 bg-linear-[158deg,rgba(86,100,179,0.3)_2.67%,rgba(46,54,99,0.12)_104.73%] px-[1.375rem] py-[2.375rem]"
        onSubmit={handleSubmit}
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
        <BottomFullButton
          type="submit"
          content="분석하기"
          state={isButtonEnabled}
          className="mt-[3.125rem]"
        />
      </form>
      {toastInfo && (
        <Toast position="ai" icon={toastInfo.icon} text={toastInfo.message} />
      )}

      <Link
        to={PAGE_PATH.COMMUNITY.SPECIFIC.FEED}
        className="body-4-medium text-gray-system-600 mt-10 flex items-center rounded-full bg-[#3c5187]/30 px-4 py-2"
      >
        함께 얘기 나누기
        <GuideIcon
          aria-hidden="true"
          className="text-gray-system-600 h-5 w-5"
        />
      </Link>
    </div>
  );
};
