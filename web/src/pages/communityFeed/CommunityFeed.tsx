import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

import { AppHeader } from "@/components/common/AppHeader";
import SearchBar from "@/components/common/SearchBar";
import ToTop from "@/components/common/ToTop";
import CommunityFeedScamTypeDropdown from "@/components/communityFeed/CommunityFeedScamTypeDropdown";
import CommunityFeedTab from "@/components/communityFeed/CommunityFeedTab";
import CommunityPostPreview from "@/components/communityFeed/CommunityPostPreview";

import { mockCommunityFeedPreviews } from "@/mocks/mockCommunityFeedPreviews";

export const CommunityFeed = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("최신");

  const [selectedScamType, setSelectedScamType] = useState("전체");
  const filteredPosts =
    selectedScamType === "전체"
      ? mockCommunityFeedPreviews
      : mockCommunityFeedPreviews.filter(
          (post) => post.category === selectedScamType,
        );

  //TODO: @tifsy 서버 api에 맞게 아래 CommunityTab 로직 수정
  const sortedPosts =
    activeTab === "인기"
      ? [...filteredPosts].sort((a, b) => b.commentCount - a.commentCount)
      : [...filteredPosts].sort(
          (a, b) =>
            new Date(b.date.replace(/\./g, "-")).getTime() -
            new Date(a.date.replace(/\./g, "-")).getTime(),
        );

  //TODO: @tifsy 검색 로직 추가
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="bg-bg-100 min-h-screen pb-21">
      <AppHeader
        title="커뮤니티"
        logo
        onWrite={() => navigate(path.community.write)}
        onNotification={() => console.log("🚨알림 클릭됨")}
      />
      <div className="px-5 pt-11">
        <SearchBar
          placeholder="검색어를 입력해주세요."
          value={searchValue}
          onChange={setSearchValue}
        />
        <CommunityFeedTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <CommunityFeedScamTypeDropdown
          selectedScamType={selectedScamType}
          onSelect={setSelectedScamType}
        />
        {sortedPosts.length === 0 ? (
          <div className="body-2-medium text-gray-system-600 py-10 text-center whitespace-pre-line">
            {activeTab === "인기" ? (
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
          </div>
        ) : (
          <div className="divide-bg-50 divide-y">
            {sortedPosts.map((post) => (
              <CommunityPostPreview key={post.id} {...post} />
            ))}
          </div>
        )}
      </div>
      <ToTop />
    </div>
  );
};
