import { useEffect, useRef, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getCommunityPosts } from "@/apis/community/getCommunityPosts";
import { useDebounce } from "@/hooks/useDebounce";

import { LoadingSpinner } from "@/components/animation/LoadingSpinner";
import { NoResult } from "@/components/common/NoResult";
import { SearchBar } from "@/components/common/SearchBar";
import { ToTop } from "@/components/common/ToTop";
import { SearchResultPreview } from "@/components/searchPage/SearchResultPreview";

import { QUERY_KEYS } from "@/constants/apiConstants";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const debouncedQuery = useDebounce(query, 1000);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_SEARCH_RESULT, searchKeyword],
      queryFn: ({ pageParam = 1 }) =>
        getCommunityPosts({
          keyword: searchKeyword,
          sort: "latest",
          page: pageParam,
          size: 20,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.number + 1;
      },
      enabled: !!searchKeyword,
    });

  const allPosts = data?.pages.flatMap((page) => page.content) || [];

  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      setSearchKeyword(debouncedQuery.trim());
    } else {
      setSearchKeyword("");
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="bg-bg-100 safearea flex h-screen flex-col">
      <header className="fixed z-10 px-5 pt-6">
        <SearchBar
          placeholder="사기 사례를 검색해주세요."
          value={query}
          onChange={setQuery}
        />
      </header>

      <div ref={scrollRef} className="overflow-y-auto px-5 pt-[4.25rem]">
        {searchKeyword !== "" &&
          (allPosts.length === 0 ? (
            <NoResult text="검색 결과를 찾을 수 없어요." type="none" />
          ) : (
            <>
              <ul>
                {allPosts.map((post) => (
                  <li key={post.id}>
                    <SearchResultPreview
                      id={post.id}
                      title={post.title}
                      content={post.content}
                    />
                  </li>
                ))}
              </ul>
              {hasNextPage && !isFetchingNextPage && (
                <div ref={inViewRef} className="flex justify-center py-4">
                  <LoadingSpinner width={16} height={16} />
                </div>
              )}
            </>
          ))}
      </div>

      <ToTop bottom="2rem" scrollContainerRef={scrollRef} />
    </div>
  );
};
