//리뷰

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { AppHeader } from "@/components/common/AppHeader";
import { ToTop } from "@/components/common/ToTop";
import { MyAnalysisList } from "@/components/my/MyAnalysisList";
import { MyAnalysisPageTab } from "@/components/my/MyAnalysisPageTab";

import { MY_ANALYSIS_PAGE_TABS } from "@/constants/myAnalysisPageTabs";

import { mockMyAnalysisPageData } from "@/mocks/mockMyAnalysisPageData";

export const MyAnalysisPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(MY_ANALYSIS_PAGE_TABS[0]);

  return (
    <div className="bg-bg-100">
      <AppHeader onPrev={() => navigate(-1)} title="분석 내역 보기" />

      <div className="divide-bg-50 divide-y px-5 pt-11">
        <MyAnalysisPageTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <MyAnalysisList items={mockMyAnalysisPageData} />
      </div>

      <ToTop bottom="2rem" />
    </div>
  );
};
