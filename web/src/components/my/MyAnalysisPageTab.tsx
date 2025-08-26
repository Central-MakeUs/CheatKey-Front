import { cn } from "@/lib/cn";

import { MY_ANALYSIS_PAGE_TABS } from "@/constants/myAnalysisPageTabs";

interface MyAnalysisPageTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MyAnalysisPageTab = ({
  activeTab,
  setActiveTab,
}: MyAnalysisPageTabProps) => {
  return (
    //TODO: @tifsy 커뮤니티 피드랑 이 페이지 탭 컴포넌트화
    <div className="mx-5">
      <div className="flex w-full justify-between">
        {MY_ANALYSIS_PAGE_TABS.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              aria-label={`${tab} 탭`}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-10 flex-1 transition-colors duration-300 ease-in-out",
                isActive
                  ? "text-primary-400 border-primary-400 body-1-bold border-b-[1.5px]"
                  : "text-gray-system-600 border-bg-50 body-2-medium border-b",
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};
