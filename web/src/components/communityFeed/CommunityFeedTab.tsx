import { cn } from "@/utils/cn";

import { COMMUNITY_FEED_TABS } from "@/constants/commnityFeedTabs";

interface CommunityFeedTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CommunityFeedTab = ({
  activeTab,
  setActiveTab,
}: CommunityFeedTabProps) => {
  return (
    <div className="border-gray-system-700 border-b">
      <div className="flex w-full justify-between">
        {COMMUNITY_FEED_TABS.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              aria-label={`${tab} 탭`}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-10 flex-1 border-b",
                isActive
                  ? "text-primary-400 border-primary-400 body-1-bold border-b-[1px]"
                  : "text-gray-system-600 border-bg-50 body-2-medium border-b-[0.5px]",
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
