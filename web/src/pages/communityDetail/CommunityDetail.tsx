import { useEffect, useState, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getCommentList } from "@/apis/comment/getCommentList";
import type { CommentPostRequest } from "@/apis/comment/postComment";
import { getCommunityDetail } from "@/apis/community/getCommunityDetail";
import { useBlockCommentMutation } from "@/hooks/community/mutations/useBlockCommentMutation";
import { useBlockPostMutation } from "@/hooks/community/mutations/useBlockPostMutation";
import { useDeleteCommentMutation } from "@/hooks/community/mutations/useDeleteCommentMutation";
import { useDeletePostMutation } from "@/hooks/community/mutations/useDeletePostMutation";
import { usePostCommentMutation } from "@/hooks/community/mutations/usePostCommentMutation";
import { useMenu } from "@/hooks/community/useMenu";
import { formatUTCtoKR } from "@/utils/formatUTCtoKR";

import { LoadingScreen } from "@/components/animation/LoadingScreen";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomSheet } from "@/components/common/BottomSheet";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { ReportSheet } from "@/components/common/ReportSheet";
import { SelectBox } from "@/components/common/SelectBox";
import { CommentInput } from "@/components/communityDetail/CommentInput";
import { CommentSection } from "@/components/communityDetail/CommentSection";
import { CommunityPostContent } from "@/components/communityDetail/CommunityPostContent";

import { QUERY_KEYS } from "@/constants/api/apiConstants";

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
    queryKey: postDetailQueryKey,
    queryFn: () => getCommunityDetail({ postId: parseInt(postId!) }),
    enabled: !!postId,
    staleTime: 10 * 1000,
  });

  const { mutate: deletePost } = useDeletePostMutation({
    queryKeyToInvalidate: [
      [QUERY_KEYS.GET_COMMUNITY_FEED],
      [QUERY_KEYS.MYPAGE_POST],
    ],
    onSuccess: () => navigate(-1),
  });

  const {
    data: commentList,
    isLoading: isCommentListLoading,
    isError: isCommentListError,
  } = useQuery({
    queryKey: commentListQueryKey,
    queryFn: () => getCommentList({ postId: parseInt(postId!) }),
    staleTime: 10 * 1000,
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
    openPostMenu,
    openCommentMenu,
    openBlockPostConfirm,
    openBlockCommentConfirm,
    openReportPostSheet,
    openReportCommentSheet,
    openPostDeleteConfirm,
    openCommentDeleteConfirm,
    showReportComplete,
    close,
  } = useMenu();

  const { mutate: blockPost } = useBlockPostMutation({
    queryKeyToInvalidate: [postDetailQueryKey, commentListQueryKey],
  });

  const { mutate: blockComment } = useBlockCommentMutation({
    queryKeyToInvalidate: [postDetailQueryKey, commentListQueryKey],
  });

  const handleBlockPostConfirm = () => {
    if (menuState.id) {
      blockPost({ postId: menuState.id });
    }
    close();
  };

  const handleBlockCommentConfirm = () => {
    if (menuState.id) {
      blockComment({ commentId: menuState.id });
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
    return <LoadingScreen />;
  }

  if (isPostDetailError || isCommentListError || !postDetail) {
    return (
      <>
        <AppHeader
          title="오류"
          onPrev={() => navigate(-1)}
          className="bg-bg-100"
        />

        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="body-2-medium text-gray-system-600">
            게시글을 불러오는 데 실패했습니다.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="bg-primary-400 body-2-medium rounded-lg px-4 py-2 text-white"
          >
            뒤로 가기
          </button>
        </div>
      </>
    );
  }

  return (
    <>
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
          onOpenMenu={openPostMenu}
        />

        <p className="text-gray-system-400 body-2-medium px-5 py-2.5">
          댓글 {postDetail.commentCount}개
        </p>
        <CommentSection
          comments={commentList}
          selectedCommentId={selectedCommentId}
          onSelectComment={handleSelectComment}
          onDeleteComment={openCommentDeleteConfirm}
          onOpenMenu={openCommentMenu}
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

      <BottomSheet
        isOpen={
          menuState.type === "postMenu" || menuState.type === "commentMenu"
        }
        onClose={close}
      >
        <div className="mx-5 my-[1.875rem] flex flex-col gap-2.5">
          {postDetail.canDelete && menuState.type === "postMenu" ? (
            <SelectBox
              type="menu"
              label="삭제하기"
              onClick={() => openPostDeleteConfirm(menuState.id!)}
            />
          ) : (
            <>
              <SelectBox
                type="menu"
                label="해당 유저 차단하기"
                onClick={() =>
                  menuState.type === "postMenu"
                    ? openBlockPostConfirm(menuState.id!)
                    : openBlockCommentConfirm(menuState.id!)
                }
              />
              <SelectBox
                type="menu"
                label="신고하기"
                onClick={() =>
                  menuState.type === "postMenu"
                    ? openReportPostSheet(menuState.id!)
                    : openReportCommentSheet(menuState.id!)
                }
              />
            </>
          )}
        </div>
      </BottomSheet>
      {menuState.type === "blockPost" && (
        <ConfirmModal
          title="해당 유저를 차단하시겠어요?"
          description={`차단 시, 이 유저의 게시물을\n더 이상 볼 수 없습니다.`}
          confirmText="차단하기"
          cancelText="취소"
          onConfirm={handleBlockPostConfirm}
          onCancel={close}
        />
      )}
      {menuState.type === "blockComment" && (
        <ConfirmModal
          title="해당 유저를 차단하시겠어요?"
          description={`차단 시, 이 유저의 댓글을\n더 이상 볼 수 없으며, 해제할 수 없습니다.`}
          confirmText="차단하기"
          cancelText="취소"
          onConfirm={handleBlockCommentConfirm}
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

      <ReportSheet
        isOpen={
          menuState.type === "reportPost" || menuState.type === "reportComment"
        }
        id={menuState.id!}
        reportType={menuState.type}
        queryKeyToInvalidate={
          menuState.type === "reportPost"
            ? [postDetailQueryKey]
            : [postDetailQueryKey, commentListQueryKey]
        }
        onClose={close}
        onReportComplete={() => {
          showReportComplete();
        }}
      />

      {menuState.type === "reportComplete" && (
        <ConfirmModal
          title="신고가 정상적으로 접수되었습니다."
          description={`접수해주신 내용을 바탕으로\n신속하고 정확하게 검토하겠습니다.`}
          confirmText="확인"
          onConfirm={close}
        />
      )}
    </>
  );
};
