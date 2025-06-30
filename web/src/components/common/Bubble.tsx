import { cn } from "@/utils/cn";
import React from "react";
import Close from "@/assets/icons/close.svg?react";

// 말풍선 방향
export const BUBBLE_DIR = {
  TOP_RIGHT: "top_right",
  BOTTOM_CENTER: "bottom_center",
} as const;

type BubbleDir = (typeof BUBBLE_DIR)[keyof typeof BUBBLE_DIR];

interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  dir?: BubbleDir;
  text: React.ReactNode;
  onClose?: () => void;
}

export const Bubble = ({
  dir,
  text,
  onClose,
  className,
  ...props
}: BubbleProps) => {
  // 기본 스타일
  const baseStyle =
    "relative flex bg-primary-500 body-4-medium w-fit gap-3 text-base-0 items-center justify-center p-2.5 rounded-xl text-center align-middle";

  // 꼬리 스타일
  const tailStyle = dir
    ? {
        [BUBBLE_DIR.TOP_RIGHT]:
          "absolute -top-1.5 left-6 h-3 w-3 -translate-x-1/2 rotate-45 bg-primary-500",
        [BUBBLE_DIR.BOTTOM_CENTER]:
          "absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-primary-500",
      }[dir]
    : null;

  return (
    <div className={cn(baseStyle, className)} {...props}>
      {text}
      {dir && <div className={cn(tailStyle)} />}
      {onClose && (
        <button type="button" onClick={onClose}>
          <Close className="text-gray-system-300 h-4 w-4" />
        </button>
      )}
    </div>
  );
};
