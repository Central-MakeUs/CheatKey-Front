import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { path } from "@/routes/path";

import { getCommunityPosts } from "@/apis/community/getCommunityPosts";

import { LoadingSpinner } from "@/components/animation/LoadingSpinner";
import { AppHeader } from "@/components/common/AppHeader";
import { SearchBarRedirect } from "@/components/common/SearchBarRedirect";
import { ToTop } from "@/components/common/ToTop";
import { CommunityFeedSortOptionDropdown } from "@/components/communityFeed/CommunityFeedSortOptionDropdown";
import { CommunityFeedTab } from "@/components/communityFeed/CommunityFeedTab";
import { CommunityPostPreview } from "@/components/communityFeed/CommunityPostPreview";

import { COMMUNITY_FEED_TABS } from "@/constants/commnityFeedTabs";

import WriteOff from "@/assets/icons/write_off.svg?react";

const sortToParam = (sort: string): string => {
  return sort === "인기순" ? "popular" : "latest";
};

const categoryToKeyword = (category: string): string => {
  return COMMUNITY_FEED_TABS.includes(category) ? category : "";
};

export const CommunityFeed = () => {
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedSortOption, setSelectedSortOption] = useState("최신순");

  const [selectedCategory, setSelectedCategory] = useState("신고합니다");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["communityPosts", selectedCategory, selectedSortOption],
    queryFn: () =>
      getCommunityPosts({
        keyword: categoryToKeyword(selectedCategory),
        sort: sortToParam(selectedSortOption),
        page: 0,
        size: 20,
      }),
  });
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
        {/* isError 에러 처리 */}

        {isLoading && <LoadingSpinner width={16} height={16} />}

        {!isLoading && !isError && data && (
          <>
            {data.content.length === 0 ? (
              <div className="flex flex-col items-center">
                <p className="body-2-medium text-gray-system-600 py-[1.75rem] text-center whitespace-pre-line">
                  현재 작성된 글이 존재하지 않아요.
                  <br />
                  새로운 글을 작성해보세요!
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
                {data.content.map((post) => (
                  <CommunityPostPreview key={post.id} {...post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <ToTop scrollContainerRef={scrollRef} />
    </div>
  );
};
