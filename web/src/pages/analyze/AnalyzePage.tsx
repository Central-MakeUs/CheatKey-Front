import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  TabSwitcher,
  type TabCategory,
} from "@/components/analyze/TabSwitcher";
import { AppHeader } from "@/components/common/AppHeader";

export const AnalyzePage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabCategory>("url");

  return (
    <div className="relative flex h-full w-full flex-1 flex-col items-center bg-linear-[180deg,rgba(0,40,255,0.2)_0%,rgba(34,68,109,0.1)_30%,rgba(34,68,109,0.1)_78.11%,rgba(23,40,134,0.2)_100%]">
      <AppHeader title="분석하기" onPrev={() => navigate(-1)} />
      <div className="mt-header flex w-full justify-center pt-3">
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};
