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
    toast,
    setToast,
    modal,
    setModal,
    isValid,
    isImageTooLarge,
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
      if (isImageTooLarge) {
        showToast("image");
      } else if (
        form.title.trim().length < 10 ||
        form.content.trim().length < 10
      ) {
        showToast("title");
      } else if (!form.board) {
        showToast("board");
      }
      return;
    }

    setModal((prev) => ({ ...prev, complete: true }));
  };

  const showToast = (type: "title" | "content" | "board" | "image") => {
    const toastState = {
      titleTooShort: false,
      boardEmpty: false,
      imageTooLarge: false,
    };

    if (type === "title" || type === "content") toastState.titleTooShort = true;
    if (type === "board") toastState.boardEmpty = true;
    if (type === "image") toastState.imageTooLarge = true;

    setToast(toastState);

    setTimeout(() => {
      setToast({
        titleTooShort: false,
        boardEmpty: false,
        imageTooLarge: false,
      });
    }, 3000);
  };

  return (
    <div className="bg-bg-100 flex h-screen flex-col">
      <AppHeader onPrev={handleBack} title="글 작성하기" />
      <div className="justify mx-5 mt-[4.6875rem] flex h-full flex-col justify-between">
        <TitleForm
          title={form.title}
          onChange={(v) => updateForm("title", v)}
        />
        <PostBoardSelect
          value={form.board}
          onChange={(v) => updateForm("board", v)}
        />
        <CommunityWriteForm
          value={form.content}
          onChange={(v) => updateForm("content", v)}
        />
        <PostImageUploader
          value={form.images}
          onChange={(v) => updateForm("images", v)}
        />

        <BottomFullButton
          state={true}
          onClick={handleSubmit}
          content="등록하기"
        />
        {toast.imageTooLarge && (
          <Toast text="사진 용량이 너무 커요." position="write" />
        )}
        {toast.titleTooShort && (
          <Toast text="최소 10자 이상 작성해주세요." position="write" />
        )}
        {toast.boardEmpty && (
          <Toast text="게시판을 선택해주세요." position="write" />
        )}

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
