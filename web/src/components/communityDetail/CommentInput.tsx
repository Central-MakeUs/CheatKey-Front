import { useState } from "react";

import { cn } from "@/utils/cn";

import UploadCommentIcon from "@/assets/icons/arrow_up.svg?react";

export const CommentInput = () => {
  const [comment, setComment] = useState("");

  const isDisabled = !comment.trim();

  const handleSubmit = () => {
    if (isDisabled) return;
    console.log("📩 댓글 전송됨:", {
      content: comment,
    });
    setComment("");
  };

  return (
    <div className="bg-bg-100 border-bg-50 fixed right-0 bottom-0 left-0 z-10 flex items-center gap-3 border-t px-5 py-2.5">
      <textarea
        aria-label="댓글을 작성해주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={1}
        placeholder="댓글을 작성해주세요."
        className="body-3-regular text-gray-system-200 placeholder-gray-system-600 bg-bg-50 box-border max-h-[100px] min-h-12 flex-1 resize-none content-center-safe overflow-y-auto rounded-xl px-[10px] py-[8px] leading-[1.4] outline-none"
      />

      <button
        onClick={handleSubmit}
        className="disabled:bg-base-50 bg-primary-400 flex h-12 w-12 items-center justify-center rounded-xl"
        disabled={!comment.trim()}
        aria-label="댓글 전송하기"
      >
        <UploadCommentIcon
          className={cn(
            "h-5 w-6",
            isDisabled ? "text-gray-system-700" : "text-gray-system-50",
          )}
        />
      </button>
    </div>
  );
};
