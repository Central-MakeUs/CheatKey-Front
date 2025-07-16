import { useState } from "react";

import SearchBar from "@/components/common/SearchBar";
import { SearchResultPreview } from "@/components/searchPage/SearchResultPreview";

import CuttingSad from "@/assets/images/cutting_sad.svg?react";

import { mockCommunityFeedPreviews } from "@/mocks/mockCommunityFeedPreviews";
export const SearchPage = () => {
  const [query, setQuery] = useState("");

  const filteredPosts = mockCommunityFeedPreviews.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()),
  );

  const hasNoSearchResult = query.trim() !== "" && filteredPosts.length === 0;

  return (
    <>
      <header className="bg-bg-100 fixed top-0 right-0 left-0 z-10 px-5 pt-6">
        <SearchBar
          placeholder="사기 사례를 검색해주세요."
          value={query}
          onChange={setQuery}
        />
      </header>

      <div className="bg-bg-100 h-screen px-5 pt-[4.25rem] pb-21">
        {hasNoSearchResult ? (
          <div className="flex flex-col items-center justify-center gap-5 py-18">
            <CuttingSad className="h-[130px] w-[130px]" />
            <p className="text-gray-system-500 body-3-regular text-center">
              검색 결과를 찾을 수 없어요.
            </p>
          </div>
        ) : (
          <div>
            {filteredPosts.map((post) => (
              <SearchResultPreview
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
