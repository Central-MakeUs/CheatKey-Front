import { useEffect, useState } from "react";

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
  dimmedBackground?: "dimmed" | "solid";
  isBlur?: boolean;
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
  isBlur,
}: ConfirmModalProps) => {
  const showCancelButton = typeof onCancel === "function";
  const bgClass = dimmedBackground === "dimmed" ? "bg-black/50" : "bg-black";

  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const element = document.getElementById("modal-root");
    if (element) {
      setPortalElement(element);
    }
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setTimeout(() => setIsVisible(true), 50);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleClose = (callback: () => void) => {
    setIsClosing(true);
    setTimeout(() => {
      callback();
    }, 200);
  };

  const confirmModalContent = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out",
        bgClass,
        {
          "backdrop-blur-[5px]": isBlur,
          "opacity-0": !isVisible || isClosing,
          "opacity-100": isVisible && !isClosing,
        },
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div
        className={cn(
          "text-base-0 bg-bg-50 mx-5 w-full rounded-[1.625rem] px-5 pt-10 pb-5 text-center",
          "transform transition-all duration-300 ease-out",
          {
            "translate-y-4 scale-95 opacity-0": !isVisible || isClosing,

            "translate-y-0 scale-100 opacity-100": isVisible && !isClosing,
          },
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {illustration && (
          <div
            className={cn(
              "mb-5 flex transform justify-center transition-all duration-300 ease-out",
              {
                "translate-y-2 opacity-0": !isVisible || isClosing,
                "translate-y-0 opacity-100": isVisible && !isClosing,
              },
            )}
            style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
          >
            {illustration}
          </div>
        )}

        <h2
          className={cn(
            "head-3-bold transform pb-1.5 transition-all duration-300 ease-out",
            {
              "translate-y-2 opacity-0": !isVisible || isClosing,
              "translate-y-0 opacity-100": isVisible && !isClosing,
            },
          )}
          style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          id="modal-title"
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              "body-3-regular text-gray-system-400 mt-1 break-words whitespace-pre-line",
              "transform transition-all duration-300 ease-out",
              {
                "translate-y-2 opacity-0": !isVisible || isClosing,
                "translate-y-0 opacity-100": isVisible && !isClosing,
              },
            )}
            style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
            id="modal-description"
          >
            {description}
          </p>
        )}

        <div
          className={cn(
            "mt-[30px] flex justify-center gap-4",
            "transform transition-all duration-300 ease-out",
            {
              "translate-y-2 opacity-0": !isVisible || isClosing,
              "translate-y-0 opacity-100": isVisible && !isClosing,
            },
          )}
          style={{ transitionDelay: isVisible ? "250ms" : "0ms" }}
        >
          {showCancelButton && (
            <button
              onClick={() => handleClose(onCancel!)}
              className={cn(
                "bg-base-50 body-2-medium text-gray-system-500 h-[3.125rem] flex-1 rounded-xl",
                "transform transition-all duration-150 ease-out",
                "hover:scale-105 hover:bg-gray-100 active:scale-95",
              )}
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={() => handleClose(onConfirm)}
            className={cn(
              "bg-primary-400 body-1-bold text-base-0 h-[3.125rem] rounded-xl py-2",
              "transform transition-all duration-150 ease-out",
              "hover:bg-primary-500 hover:scale-105 active:scale-95",
              showCancelButton ? "flex-1" : "w-full",
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  if (!portalElement) return null;

  return createPortal(confirmModalContent, portalElement);
};
