import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { path } from "@/routes/path";

import { getCommunityDetail } from "@/apis/community/getCommunityDetail";
import { useBlockUserMutation } from "@/hooks/mutations/useBlockUserMutation";
import { usePostMenu } from "@/hooks/usePostMenu";
import { formatUTCtoKR } from "@/utils/formatUTCtoKR";

import { LoadingSpinner } from "@/components/animation/LoadingSpinner";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomSheet } from "@/components/common/BottomSheet";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { ReportPostSheet } from "@/components/common/ReportPostSheet";
import { SelectBox } from "@/components/common/SelectBox";
//import { CommentInput } from "@/components/communityDetail/CommentInput";
//import { CommentSection } from "@/components/communityDetail/CommentSection";
import { CommunityPostContent } from "@/components/communityDetail/CommunityPostContent";

//import { mockCommunityDetailCommentsData } from "@/mocks/mockCommunityDetailCommentsData";
import { QUERY_KEYS } from "@/constants/apiConstants";

export const CommunityDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const {
    data: postDetail,
    isLoading: isPostDetailLoading,
    isError: isPostDetailError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_COMMUNITY_DETAIL, postId],
    queryFn: () => getCommunityDetail({ postId: parseInt(postId!) }),
    enabled: !!postId,
  });

  const {
    menuState,
    openMenu,
    openBlockConfirm,
    openReportSheet,
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
    if (menuState.postId) {
      blockUser({ postId: menuState.postId });
    }
    close();
  };

  if (isPostDetailLoading) {
    return (
      <div className="bg-bg-100 flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isPostDetailError || !postDetail) {
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
      <div className="divide-bg-50 flex-1 divide-y overflow-y-auto pt-15">
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
        {/* 2차 배포 이후 댓글 기능 구현 예정
        <p className="text-gray-system-400 body-2-medium px-5 py-2.5">
          댓글 30개
        </p>
        <CommentSection comments={commentsForPost} />
        */}
      </div>
      {/*  2차 배포 이후 댓글 기능 구현 예정
      <div className="border-t-1">
        <CommentInput />
      </div>
      */}
      <BottomSheet isOpen={menuState.type === "menu"} onClose={close}>
        <div className="mx-5 my-[1.875rem] flex flex-col gap-2.5">
          <SelectBox
            type="postMenu"
            label="해당 유저 차단하기"
            onClick={() => openBlockConfirm(menuState.postId!)}
          />
          <SelectBox
            type="postMenu"
            label="신고하기"
            onClick={() => openReportSheet(menuState.postId!)}
          />
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

      <ReportPostSheet
        isOpen={menuState.type === "report"}
        postId={menuState.postId!}
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
