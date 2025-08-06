import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

import { AppHeader } from "@/components/common/AppHeader";
import { SearchBarRedirect } from "@/components/common/SearchBarRedirect";
import { ToTop } from "@/components/common/ToTop";
import { CommunityFeedSortOptionDropdown } from "@/components/communityFeed/CommunityFeedSortOptionDropdown";
import { CommunityFeedTab } from "@/components/communityFeed/CommunityFeedTab";
import { CommunityPostPreview } from "@/components/communityFeed/CommunityPostPreview";

import { COMMUNITY_FEED_TABS } from "@/constants/commnityFeedTabs";

import WriteOff from "@/assets/icons/write_off.svg?react";

import { mockCommunityFeedPreviews } from "@/mocks/mockCommunityFeedPreviews";

export const CommunityFeed = () => {
  const navigate = useNavigate();

  const [selectedSortOption, setSelectedSortOption] = useState("최신순");

  const [selectedCategory, setSelectedCategory] = useState("신고합니다");

  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredPosts = mockCommunityFeedPreviews.filter((post) => {
    const matchesCategory = COMMUNITY_FEED_TABS.includes(selectedCategory)
      ? post.category === selectedCategory
      : true;

    return matchesCategory;
  });

  const sortedPosts =
    selectedSortOption === "인기순"
      ? [...filteredPosts].sort((a, b) => b.commentCount - a.commentCount)
      : [...filteredPosts].sort(
          (a, b) =>
            new Date(b.date.replace(/\./g, "-")).getTime() -
            new Date(a.date.replace(/\./g, "-")).getTime(),
        );

  return (
    <div className="bg-bg-100 safearea flex h-screen flex-col">
      <AppHeader
        title="커뮤니티"
        onWrite={() => navigate(path.community.write)}
        onNotification={() => console.log("🚨알림 클릭됨")}
        className="bg-bg-100"
      />
      <div className="pt-header h-screen overflow-y-auto px-5 pb-20">
        <SearchBarRedirect placeholder="사기 사례를 입력해주세요." />
        <CommunityFeedTab
          activeTab={selectedCategory}
          setActiveTab={setSelectedCategory}
        />
        <CommunityFeedSortOptionDropdown
          selectedSortOption={selectedSortOption}
          onSelect={setSelectedSortOption}
        />
        {sortedPosts.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="body-2-medium text-gray-system-600 py-[1.75rem] text-center whitespace-pre-line">
              {selectedSortOption === "인기순" ? (
                <>
                  현재 등록된 인기글이 없습니다.
                  <br />
                  새로운 글을 작성해보세요!
                </>
              ) : (
                <>
                  현재 작성된 글이 존재하지 않아요.
                  <br />
                  새로운 글을 작성해보세요!
                </>
              )}
            </p>
            <button
              className="bg-bg-50 body-1-bold text-gray-system-500 flex h-[42px] w-[120px] items-center justify-center gap-[1px] rounded-full"
              onClick={() => navigate(path.community.write)}
            >
              <span className="body-1-bold">글 작성하기</span>
              <WriteOff
                className="h-4 w-4"
                aria-hidden="true"
                focusable="false"
              />
            </button>
          </div>
        ) : (
          <div className="divide-bg-50 divide-y">
            {sortedPosts.map((post) => (
              <CommunityPostPreview key={post.id} {...post} />
            ))}
          </div>
        )}
      </div>
      <ToTop scrollContainerRef={scrollRef} />
    </div>
  );
};
