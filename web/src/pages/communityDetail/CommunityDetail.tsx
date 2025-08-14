import { useEffect, useState, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { path } from "@/routes/path";

import { getCommentList } from "@/apis/comment/getCommentList";
import type { CommentPostRequest } from "@/apis/comment/postComment";
import { getCommunityDetail } from "@/apis/community/getCommunityDetail";
import { useBlockUserMutation } from "@/hooks/mutations/useBlockUserMutation";
import { useDeleteCommentMutation } from "@/hooks/mutations/useDeleteCommentMutation";
import { useDeletePostMutation } from "@/hooks/mutations/useDeletePostMutation";
import { usePostCommentMutation } from "@/hooks/mutations/usePostCommentMutation";
import { usePostMenu } from "@/hooks/usePostMenu";
import { formatUTCtoKR } from "@/utils/formatUTCtoKR";

import { LoadingSpinner } from "@/components/animation/LoadingSpinner";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomSheet } from "@/components/common/BottomSheet";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { ReportPostSheet } from "@/components/common/ReportPostSheet";
import { SelectBox } from "@/components/common/SelectBox";
import { CommentInput } from "@/components/communityDetail/CommentInput";
import { CommentSection } from "@/components/communityDetail/CommentSection";
import { CommunityPostContent } from "@/components/communityDetail/CommunityPostContent";

import { QUERY_KEYS } from "@/constants/apiConstants";

export const CommunityDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );

  const handleSelectComment = (commentId: number) => {
    setSelectedCommentId((prev) => (prev === commentId ? null : commentId));
  };

  const postDetailQueryKey = [QUERY_KEYS.GET_COMMUNITY_DETAIL, postId];
  const commentListQueryKey = [QUERY_KEYS.GET_COMMENT_LIST, postId];

  const {
    data: postDetail,
    isLoading: isPostDetailLoading,
    isError: isPostDetailError,
  } = useQuery({
    queryKey: commentListQueryKey,
    queryFn: () => getCommunityDetail({ postId: parseInt(postId!) }),
    enabled: !!postId,
  });

  const { mutate: deletePost } = useDeletePostMutation({
    queryKeyToInvalidate: [QUERY_KEYS.GET_COMMUNITY_FEED],
    onSuccess: () => navigate(-1),
  });

  const {
    data: commentList,
    isLoading: isCommentListLoading,
    isError: isCommentListError,
  } = useQuery({
    queryKey: postDetailQueryKey,
    queryFn: () => getCommentList({ postId: parseInt(postId!) }),
    enabled: !!postId,
  });

  const { mutate: postComment, isPending: isCommentSubmitting } =
    usePostCommentMutation([postDetailQueryKey, commentListQueryKey]);

  const { mutate: deleteComment } = useDeleteCommentMutation([
    postDetailQueryKey,
    commentListQueryKey,
  ]);

  const handleCommentSubmit = (content: string) => {
    const commentData: CommentPostRequest = {
      postId: parseInt(postId!),
      content,
    };

    if (selectedCommentId !== null) {
      commentData.parentId = selectedCommentId;
    }

    postComment(commentData);
    setSelectedCommentId(null);
  };

  const {
    menuState,
    openMenu,
    openBlockConfirm,
    openReportSheet,
    openPostDeleteConfirm,
    openCommentDeleteConfirm,
    showReportComplete,
    close,
  } = usePostMenu({
    onReportComplete: () => navigate(path.community.feed),
  });

  const { mutate: blockUser } = useBlockUserMutation([
    QUERY_KEYS.GET_COMMUNITY_DETAIL,
    postId,
  ]);

  const handleBlockConfirm = () => {
    if (menuState.id) {
      blockUser({ postId: menuState.id });
    }
    close();
  };

  const handlePostDelete = () => {
    if (menuState.id) {
      deletePost({ postId: menuState.id });
    }
    close();
  };

  const handleCommentDelete = () => {
    if (menuState.id) {
      deleteComment({ commentId: menuState.id });
    }
    close();
  };

  useEffect(() => {
    if (selectedCommentId !== null) {
      commentInputRef.current?.focus();
    }
  }, [selectedCommentId]);

  if (isPostDetailLoading || isCommentListLoading) {
    return (
      <div className="bg-bg-100 flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isPostDetailError || isCommentListError || !postDetail) {
    return (
      <div className="bg-bg-100 safearea flex h-screen flex-col">
        <AppHeader
          title="오류"
          onPrev={() => navigate(-1)}
          className="bg-bg-100"
        />

        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-gray-system-400">
            게시글을 불러오는 데 실패했습니다.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="bg-bg-50 body-2-medium rounded-lg px-4 py-2 text-white"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-100 safearea layout flex h-screen flex-col">
      <AppHeader
        title={`${postDetail?.authorNickname}님의 글`}
        onPrev={() => navigate(-1)}
        onNotification={() => console.log("🚨알림 클릭됨")}
        className="bg-bg-100"
      />
      <div
        onClick={() => setSelectedCommentId(null)}
        className="divide-bg-50 flex-1 divide-y overflow-y-auto pt-15"
      >
        <CommunityPostContent
          postId={postDetail.id}
          title={postDetail.title}
          nickname={postDetail.authorNickname}
          date={formatUTCtoKR(postDetail.createdAt)}
          content={postDetail.content}
          images={postDetail.presignedUrls}
          canDelete={postDetail.canDelete}
          onOpenMenu={openMenu}
        />

        <p className="text-gray-system-400 body-2-medium px-5 py-2.5">
          댓글 {postDetail.commentCount}개
        </p>
        <CommentSection
          comments={commentList}
          selectedCommentId={selectedCommentId}
          onSelectComment={handleSelectComment}
          onDeleteComment={openCommentDeleteConfirm}
        />
      </div>

      <div className="border-t-1">
        <CommentInput
          ref={commentInputRef}
          onCommentSubmit={handleCommentSubmit}
          isSubmitting={isCommentSubmitting}
          isReplying={selectedCommentId !== null}
        />
      </div>

      <BottomSheet isOpen={menuState.type === "menu"} onClose={close}>
        <div className="mx-5 my-[1.875rem] flex flex-col gap-2.5">
          {postDetail.canDelete ? (
            <SelectBox
              type="postMenu"
              label="삭제하기"
              onClick={() => openPostDeleteConfirm(menuState.id!)}
            />
          ) : (
            <>
              <SelectBox
                type="postMenu"
                label="해당 유저 차단하기"
                onClick={() => openBlockConfirm(menuState.id!)}
              />
              <SelectBox
                type="postMenu"
                label="신고하기"
                onClick={() => openReportSheet(menuState.id!)}
              />
            </>
          )}
        </div>
      </BottomSheet>
      {menuState.type === "block" && (
        <ConfirmModal
          title="해당 유저를 차단하시겠어요?"
          description={`차단 시, 이 유저의 게시물을\n더 이상 볼 수 없습니다.`}
          confirmText="차단하기"
          cancelText="취소"
          onConfirm={handleBlockConfirm}
          onCancel={close}
        />
      )}
      {menuState.type === "deletePost" && (
        <ConfirmModal
          title="게시물을 삭제하시겠어요?"
          description="삭제하면 다시는 볼 수 없어요!"
          confirmText="확인"
          cancelText="취소"
          onConfirm={handlePostDelete}
          onCancel={close}
        />
      )}
      {menuState.type === "deleteComment" && (
        <ConfirmModal
          title="댓글을 삭제하시겠어요?"
          confirmText="확인"
          cancelText="취소"
          onConfirm={handleCommentDelete}
          onCancel={close}
        />
      )}

      <ReportPostSheet
        isOpen={menuState.type === "report"}
        postId={menuState.id!}
        onClose={close}
        onReportComplete={showReportComplete}
      />

      {menuState.type === "reportComplete" && (
        <ConfirmModal
          title="신고가 정상적으로 접수되었습니다."
          description={`접수해주신 내용을 바탕으로\n신속하고 정확하게 검토하겠습니다.`}
          confirmText="확인"
          onConfirm={close}
        />
      )}
    </div>
  );
};
