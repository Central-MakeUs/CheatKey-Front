import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import {
  postCommunityPosts,
  postFilesUpload,
  type CommunityPostResponse,
} from "@/apis/community/postCommunity";
import { useCommunityWriteState } from "@/hooks/useCommunityWriteState";
import type { CommunityWriteFormState } from "@/types/community/community.types";
import { generatePath } from "@/utils/generatePath";

import { AppHeader } from "@/components/common/AppHeader";
import { BottomFullButton } from "@/components/common/BottomFullButton";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { Toast } from "@/components/common/Toast";
import { CommunityWriteForm } from "@/components/communityWrite/CommunityWriteForm";
import { PostBoardSelect } from "@/components/communityWrite/PostBoardSelect";
import { PostImageUploader } from "@/components/communityWrite/PostImageUploader";
import { TitleForm } from "@/components/communityWrite/TitleForm";

import { QUERY_KEYS } from "@/constants/api/apiConstants";
import { BOARD_CATEGORY_MAP } from "@/constants/community/communityFeedTabs";
import { PAGE_PATH } from "@/constants/route/path";

export const CommunityWrite = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [lastPostedId, setLastPostedId] = useState<number | null>(null);

  const {
    form,
    updateForm,
    modal,
    setModal,
    isValid,
    errors,
    toastMessage,
    showToast,
  } = useCommunityWriteState();

  const { mutate: createPost, isPending: isPosting } = useMutation<
    CommunityPostResponse,
    Error,
    CommunityWriteFormState
  >({
    mutationFn: async (formData) => {
      let fileUploadIds: number[] = [];
      if (formData.images.length > 0) {
        const files = formData.images.map((img) => img.file);
        const uploadResponse = await postFilesUpload(files);
        fileUploadIds = uploadResponse.map(
          (responseItem) => responseItem.fileUploadId,
        );
      }
      const categoryForApi =
        BOARD_CATEGORY_MAP[formData.board] || formData.board;

      const postData = {
        title: formData.title,
        content: formData.content,
        category: categoryForApi,
        fileUploadIds,
      };
      return postCommunityPosts(postData);
    },
    onSuccess: (response) => {
      setLastPostedId(response);
      setModal((prev) => ({ ...prev, complete: true }));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMUNITY_FEED],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MYPAGE_POST],
      });
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 400) {
        showToast("유효성 검사에 실패하였습니다.");
      } else if (isAxiosError(error) && error.response?.status === 500) {
        showToast("파일 용량이 너무 큽니다.");
      } else {
        showToast("업로드 중 오류가 발생하였습니다.");
      }
    },
  });

  const handleBack = () => {
    const hasContent =
      form.title || form.board || form.content || form.images.length > 0;
    if (hasContent) {
      setModal((prev) => ({ ...prev, leave: true }));
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    if (!isValid) {
      const firstError = Object.values(errors)[0];
      if (firstError) {
        showToast(firstError);
      }
      return;
    }
    createPost(form);
  };

  return (
    <>
      <AppHeader
        onPrev={handleBack}
        title="글 작성하기"
        className="bg-bg-100"
      />
      <div className="mt-[4.6875rem] flex h-full flex-col gap-y-6 px-5 pb-5">
        <TitleForm
          title={form.title}
          onChange={(value) => updateForm("title", value)}
        />

        <PostBoardSelect
          value={form.board}
          onChange={(value) => updateForm("board", value)}
        />

        <CommunityWriteForm
          value={form.content}
          onChange={(value) => updateForm("content", value)}
        />

        <PostImageUploader
          value={form.images}
          onChange={(value) => updateForm("images", value)}
          showToast={showToast}
        />

        <BottomFullButton
          state={!isPosting}
          onClick={handleSubmit}
          content={isPosting ? "등록 중..." : "등록하기"}
        />

        {toastMessage && <Toast text={toastMessage} position="write" />}

        {modal.leave && (
          <ConfirmModal
            title="작성 중인 글이 저장되지 않았어요."
            description={`이 페이지를 나가면 지금까지 작성한 내용이\n모두 사라집니다. 정말 나가시겠어요?`}
            confirmText="이어쓰기"
            cancelText="나가기"
            onConfirm={() => setModal((prev) => ({ ...prev, leave: false }))}
            onCancel={() => navigate(-1)}
          />
        )}

        {modal.complete && (
          <ConfirmModal
            title="작성을 완료했어요!"
            description="작성하신 글을 보러가시겠어요?"
            confirmText="보러가기"
            cancelText="취소"
            onConfirm={() => {
              navigate(
                generatePath(PAGE_PATH.COMMUNITY.SPECIFIC.DETAIL, {
                  postId: String(lastPostedId),
                }),
                { replace: true },
              );
            }}
            onCancel={() => navigate(PAGE_PATH.HOME, { replace: true })}
          />
        )}
      </div>
    </>
  );
};
