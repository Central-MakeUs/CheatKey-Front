import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { AppHeader } from "@/components/common/AppHeader";
import { ToTop } from "@/components/common/ToTop";
import { MyAnalysisList } from "@/components/my/MyAnalysisList";
import { MyAnalysisPageTab } from "@/components/my/MyAnalysisPageTab";

import { MY_ANALYSIS_PAGE_TABS } from "@/constants/myAnalysisPageTabs";

export const MyAnalysisPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(MY_ANALYSIS_PAGE_TABS[0]);

  const getPeriodFromTab = (tab: string) => {
    switch (tab) {
      case "오늘":
        return "today";
      case "이번 주":
        return "week";
      case "이번 달":
        return "month";
      default:
        return "today";
    }
  };

  const period = getPeriodFromTab(activeTab);

  return (
    <div className="safearea bg-bg-100 flex h-screen flex-col">
      <AppHeader
        onPrev={() => navigate(-1)}
        title="분석 내역 보기"
        className="bg-bg-100"
      />
      <div className="divide-bg-50 divide-y overflow-y-auto pt-11">
        <MyAnalysisPageTab activeTab={activeTab} setActiveTab={setActiveTab} />

        <MyAnalysisList period={period} />
      </div>
      <ToTop bottom="2rem" />
    </div>
  );
};
