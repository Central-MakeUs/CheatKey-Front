import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/utils/cn";

import CloseIcon from "@/assets/icons/close.svg?react";

export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

const tailPlacementStyles: Record<Placement, string> = {
  top: "bottom-full left-1/2 translate-y-1/2 -translate-x-1/2",
  "top-start": "bottom-full left-3 translate-y-1/2 translate-x-1/2",
  "top-end": "bottom-full right-3  translate-y-1/2 -translate-x-1/2",
  bottom: "top-full left-1/2 -translate-y-1/2 -translate-x-1/2",
  "bottom-start": "top-full left-3 -translate-y-1/2 translate-x-1/2",
  "bottom-end": "top-full right-3 -translate-y-1/2 -translate-x-1/2",
  left: "right-full top-1/2 -translate-y-1/2 translate-x-1/2",
  "left-start": "right-full top-2 translate-y-1/2 translate-x-1/2",
  "left-end": "right-full bottom-2 -translate-y-1/2 translate-x-1/2",
  right: "left-full top-1/2 -translate-y-1/2 -translate-x-1/2",
  "right-start": "left-full top-2 translate-y-1/2 -translate-x-1/2",
  "right-end": "left-full bottom-2 -translate-y-1/2  -translate-x-1/2",
};

interface TooltipBubbleProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  placement?: Placement;
  className?: string;
}

export const TooltipBubble = ({
  children,
  isOpen,
  onClose,
  placement = "top",
  className,
}: TooltipBubbleProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "bg-primary-500 relative w-fit rounded-xl p-2.5 text-[#F7F7F8]",
            className,
          )}
        >
          {/* 말풍선 내용 */}
          <div className="flex items-center gap-2">
            <div className="flex-1">{children}</div>

            {/* 닫기 버튼 */}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="툴팁 닫기"
                className="h-4 w-4"
              >
                <CloseIcon className="text-gray-system-300 h-full w-full" />
              </button>
            )}
          </div>

          {/* 말꼬리 부분 */}
          <div
            className={cn(
              "bg-primary-500 absolute h-2.5 w-2.5 rotate-45",
              tailPlacementStyles[placement],
            )}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
