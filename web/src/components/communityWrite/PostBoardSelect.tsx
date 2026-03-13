import { CategoryTagGroup } from "@/components/common/CategoryTagGroup";

import { COMMUNITY_FEED_TABS } from "@/constants/community/communityFeedTabs";

export const PostBoardSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div>
      <h1 className="head-4-semibold text-base-0 pb-3">
        게시판을 선택해주세요.<span className="text-primary-400">*</span>
      </h1>

      <CategoryTagGroup
        tags={COMMUNITY_FEED_TABS}
        selected={value}
        onSelect={onChange}
      />
    </div>
  );
};
