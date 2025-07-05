interface CommunityFeedTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const COMMUNITY_FEED_TABS = ["최신", "인기"];

const CommunityFeedTab = ({
  activeTab,
  setActiveTab,
}: CommunityFeedTabProps) => {
  return (
    <div className="border-gray-system-700 border-b">
      <div className="flex w-full justify-between">
        {COMMUNITY_FEED_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-10 flex-1 ${
              activeTab === tab
                ? "text-primary-400 border-primary-400 body-1-bold border-b-[1px]"
                : "text-gray-system-600 border-bg-50 body-2-medium border-b-[0.5px]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeedTab;
