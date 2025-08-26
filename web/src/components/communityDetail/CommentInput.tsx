import { forwardRef, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

import UploadCommentIcon from "@/assets/icons/arrow_up.svg?react";

interface CommentInputProps {
  onCommentSubmit: (content: string) => void;
  isSubmitting: boolean;
  isReplying: boolean;
}

export const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  ({ onCommentSubmit, isSubmitting, isReplying }, ref) => {
    const [comment, setComment] = useState("");

    const isDisabled = !comment.trim() || isSubmitting;

    const handleResizeHeight = (element: HTMLTextAreaElement) => {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isDisabled) return;

      onCommentSubmit(comment);
      setComment("");

      if (ref && "current" in ref && ref.current) {
        ref.current.style.height = "auto";
      }
    };

    useEffect(() => {
      if (isReplying && ref && "current" in ref && ref.current) {
        ref.current.focus();
      }
    }, [isReplying, ref]);

    return (
      <form
        onSubmit={handleSubmit}
        className="bg-bg-100 border-bg-50 fixed right-0 bottom-5 left-0 z-10 flex items-center gap-3 border-t px-5 py-2.5"
      >
        <textarea
          ref={ref}
          aria-label="댓글을 작성해주세요."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            handleResizeHeight(e.target);
          }}
          rows={1}
          placeholder="댓글을 작성해주세요."
          className="body-3-regular text-gray-system-200 placeholder-gray-system-600 bg-bg-50 box-border max-h-[82px] min-h-12 flex-1 resize-none content-center-safe overflow-y-auto rounded-xl px-2.5 py-2 outline-none"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          className="disabled:bg-base-50 bg-primary-400 flex h-12 w-12 items-center justify-center rounded-xl"
          disabled={isDisabled}
          aria-label="댓글 전송하기"
        >
          <UploadCommentIcon
            className={cn(
              "h-5 w-6",
              isDisabled ? "text-gray-system-700" : "text-gray-system-50",
            )}
            aria-hidden="true"
          />
        </button>
      </form>
    );
  },
);

CommentInput.displayName = "CommentInput";
