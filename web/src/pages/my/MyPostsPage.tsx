import { useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getMypageCommunityPostsManagement } from "@/apis/my/getMypageCommunityPostsManagement";

import { LoadingSpinner } from "@/components/animation/LoadingSpinner";
import { AppHeader } from "@/components/common/AppHeader";
import { NoResult } from "@/components/common/NoResult";
import { ToTop } from "@/components/common/ToTop";
import { MyPostsPreview } from "@/components/my/MyPostsPreview";

import { QUERY_KEYS } from "@/constants/apiConstants";

export const MyPostsPage = () => {
  const navigate = useNavigate();

  const { data: myPosts, isLoading: isPostsLoading } = useQuery({
    queryKey: [QUERY_KEYS.MYPAGE_POST],
    queryFn: getMypageCommunityPostsManagement,
  });
  const total = myPosts?.totalPosts ?? 0;
  const posts = myPosts?.posts ?? [];

  const scrollRef = useRef<HTMLDivElement>(null);

  if (isPostsLoading) {
    <div className="bg-bg-100 flex h-screen w-screen items-center justify-center">
      <LoadingSpinner width={32} height={32} />
    </div>;
  }

  return (
    <div className="safearea bg-bg-100 flex h-screen flex-col">
      <AppHeader
        title="작성글 보기"
        onPrev={() => navigate(-1)}
        className="bg-bg-100"
      />
      <div className="overflow-y-auto px-5 pt-16">
        <span className="text-base-0 head-4-semibold w-fit py-3">
          총 {total}개의 작성글
        </span>
        {posts.length === 0 ? (
          <NoResult
            text={
              "현재 작성된 글이 존재하지 않아요.\n새로운 글을 작성해보세요!"
            }
            type="write"
          />
        ) : (
          <div className="divide-bg-50 divide-y">
            {posts.map((post) => (
              <MyPostsPreview
                key={post.id}
                id={post.id}
                nickname={post.nickname}
                title={post.title}
                content={post.content}
                date={post.createdAt}
                commentCount={post.commentCount}
                images={post.imageUrls}
              />
            ))}
          </div>
        )}
      </div>
      <ToTop bottom="2rem" scrollContainerRef={scrollRef} />
    </div>
  );
};
