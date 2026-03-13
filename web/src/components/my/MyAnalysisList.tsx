import { useInfiniteQuery } from "@tanstack/react-query";

import { getMypageDetectionHistory } from "@/apis/my/getMypageDetectionHistory";

import { NoResult } from "@/components/common/NoResult";
import { MyAnalysisListItem } from "@/components/my/MyAnalysisListItem";

import { QUERY_KEYS } from "@/constants/api/apiConstants";

interface MyAnalysisListProps {
  period: "today" | "week" | "month";
}

export const MyAnalysisList = ({ period }: MyAnalysisListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_MY_ANALYZE_HISTORY, period],
    queryFn: ({ pageParam = 0 }) =>
      getMypageDetectionHistory({ page: pageParam, size: 10, period }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    return <div>❌ 데이터를 불러오지 못했습니다.</div>;
  }

  const allItems = data?.pages.flatMap((page) => page.content) || [];

  if (allItems.length === 0) {
    return <NoResult text="분석 결과가 존재하지 않아요!" type="ai" />;
  }

  return (
    <div>
      {allItems.map((item) => (
        <MyAnalysisListItem key={item.id} item={item} />
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "더 불러오는 중..." : "더보기"}
        </button>
      )}
    </div>
  );
};
