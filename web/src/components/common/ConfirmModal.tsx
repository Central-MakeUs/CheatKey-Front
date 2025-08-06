import { useEffect } from "react";

import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

interface ConfirmModalProps {
  title: string;
  description?: string;
  illustration?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  dimmedBackground?: "dimmed" | "solid"; //모달 뒤 화면의 배경색
}

export const ConfirmModal = ({
  title,
  description,
  illustration,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  dimmedBackground = "dimmed",
}: ConfirmModalProps) => {
  const showCancelButton = typeof onCancel === "function";

  const bgClass = dimmedBackground === "dimmed" ? "bg-black/50" : "bg-black";

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const confirmModalContent = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        bgClass,
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div
        className="text-base-0 bg-bg-50 mx-5 w-full rounded-[1.625rem] px-5 pt-10 pb-5 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {illustration && (
          <div className="mb-5 flex justify-center">{illustration}</div>
        )}
        <h2 className="head-3-bold pb-1.5">{title}</h2>
        {description && (
          <p className="body-3-regular text-gray-system-400 mt-1 break-words whitespace-pre-line">
            {description}
          </p>
        )}
        <div className="mt-[30px] flex justify-center gap-4">
          {showCancelButton && (
            <button
              onClick={onCancel}
              className="bg-base-50 body-2-medium text-gray-system-500 h-[3.125rem] flex-1 rounded-xl"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm}
            className={cn(
              "bg-primary-400 body-1-bold text-base-0 h-[3.125rem] rounded-xl py-2",
              showCancelButton ? "flex-1" : "w-full",
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(confirmModalContent, document.body);
};
