import { useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getMypageCommunityPostsManagement } from "@/apis/my/getMypageCommunityPostsManagement";
import { useToast } from "@/hooks/useToast";

import { LoadingScreen } from "@/components/animation/LoadingScreen";
import { AppHeader } from "@/components/common/AppHeader";
import { NoResult } from "@/components/common/NoResult";
import { Toast } from "@/components/common/Toast";
import { ToTop } from "@/components/common/ToTop";
import { MyPostsPreview } from "@/components/my/MyPostsPreview";

import { QUERY_KEYS } from "@/constants/apiConstants";

export const MyPostsPage = () => {
  const navigate = useNavigate();

  const { toastMessage, showToast } = useToast();

  const { data: myPosts, isLoading: isPostsLoading } = useQuery({
    queryKey: [QUERY_KEYS.MYPAGE_POST],
    queryFn: getMypageCommunityPostsManagement,
    staleTime: 5 * 60 * 1000,
  });
  const total = myPosts?.totalPosts ?? 0;
  const posts = myPosts?.posts ?? [];

  const scrollRef = useRef<HTMLDivElement>(null);

  if (isPostsLoading) {
    <LoadingScreen />;
  }

  return (
    <>
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
                authorNickname={post.nickname}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                commentCount={post.commentCount}
                thumbnailUrls={post.imageUrls}
                onDeleteSuccess={() => showToast("게시글이 삭제되었습니다.")}
              />
            ))}
          </div>
        )}
      </div>
      <ToTop bottom="2rem" scrollContainerRef={scrollRef} />
      {toastMessage && <Toast text={toastMessage} icon="check" position="ai" />}
    </>
  );
};
