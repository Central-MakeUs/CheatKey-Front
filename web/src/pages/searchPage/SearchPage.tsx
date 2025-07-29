import { useState } from "react";

import { NoResult } from "@/components/common/NoResult";
import { SearchBar } from "@/components/common/SearchBar";
import { ToTop } from "@/components/common/ToTop";
import { SearchResultPreview } from "@/components/searchPage/SearchResultPreview";

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

      <div className="bg-bg-100 min-h-screen px-5 pt-[4.25rem]">
        {hasNoSearchResult ? (
          <NoResult text="검색 결과를 찾을 수 없어요." type="none" />
        ) : (
          <ul>
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <SearchResultPreview
                  id={post.id}
                  title={post.title}
                  content={post.content}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <ToTop bottom="2rem" />
    </>
  );
};
