import { useNavigate } from "react-router-dom";

import { useCommunityWriteState } from "@/hooks/useCommunityWriteState";

import { AppHeader } from "@/components/common/AppHeader";
import { BottomFullButton } from "@/components/common/BottomFullButton";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { Toast } from "@/components/common/Toast";
import { CommunityWriteForm } from "@/components/communityWrite/CommunityWriteForm";
import { PostBoardSelect } from "@/components/communityWrite/PostBoardSelect";
import { PostImageUploader } from "@/components/communityWrite/PostImageUploader";
import { TitleForm } from "@/components/communityWrite/TitleForm";

export const CommunityWrite = () => {
  const navigate = useNavigate();
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

  const handleBack = () => {
    const hasContent =
      form.title || form.board || form.content || form.images.length > 0;
    if (hasContent) {
      setModal((prev) => ({ ...prev, leave: true }));
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    if (!isValid) {
      const firstError = Object.values(errors)[0];
      if (firstError) {
        showToast(firstError);
      }
      return;
    }

    setModal((prev) => ({ ...prev, complete: true }));
  };

  return (
    <div className="bg-bg-100 safearea flex h-screen flex-col pb-5">
      <AppHeader
        onPrev={handleBack}
        title="글 작성하기"
        className="bg-bg-100"
      />
      <div className="justify mx-5 mt-[4.6875rem] flex h-full flex-col gap-y-[1.5rem]">
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
        />

        <BottomFullButton
          state={true}
          onClick={handleSubmit}
          content="등록하기"
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
              // TODO: @tifsy 경로 수정
              navigate("/community/my-post");
            }}
            onCancel={() => navigate("/home")}
          />
        )}
      </div>
    </div>
  );
};
