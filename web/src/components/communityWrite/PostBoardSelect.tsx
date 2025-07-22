import { cn } from "@/utils/cn";

import { COMMUNITY_FEED_TABS } from "@/constants/commnityFeedTabs";

export const PostBoardSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <div>
      <h1 className="head-4-semibold text-base-0 pb-3">
        게시판을 선택해주세요.<span className="text-primary-400">*</span>
      </h1>

      {/* TODO: @tifsy CategoryTagGroup 컴포넌트 적용  */}
      <div className="flex gap-2">
        {COMMUNITY_FEED_TABS.map((tab) => {
          const isSelected = value === tab;
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={cn(
                "body-2-medium h-9 content-center rounded-full px-3 transition-colors",
                isSelected
                  ? "bg-primary-400 text-base-0"
                  : "bg-bg-50 text-gray-system-500",
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
