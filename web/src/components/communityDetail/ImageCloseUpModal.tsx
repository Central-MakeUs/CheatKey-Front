import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { PageIndicator } from "@/components/common/PageIndicator";

import { CARD_ANIMATION } from "@/constants/animation/cardAnimationConstants";
import { SLIDE_ANIMATION } from "@/constants/animation/slideAnimation";

import Close from "@/assets/icons/close.svg?react";

type ImageCloseUpModalProps = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
};

export const ImageCloseUpModal = ({
  images,
  initialIndex,
  onClose,
}: ImageCloseUpModalProps) => {
  const [[page, direction], setPage] = useState([initialIndex, 0]);

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage < 0 || newPage >= images.length) {
      return;
    }
    setPage([newPage, newDirection]);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    { offset }: { offset: { x: number; y: number } },
  ) => {
    const swipeThreshold = 50;

    if (offset.x < -swipeThreshold) {
      paginate(1);
    } else if (offset.x > swipeThreshold) {
      paginate(-1);
    }
  };

  return (
    <div className="safearea bg-bg-100 fixed inset-0 z-50 flex h-screen w-full flex-col items-center backdrop-blur-sm">
      <div className="flex h-fit w-full justify-end py-1.5 pr-5">
        <button
          onClick={onClose}
          className="text-base-0 h-8 w-8"
          aria-label="확대한 이미지 닫기"
        >
          <Close className="h-full w-full" />
        </button>
      </div>
      <div className="relative flex h-full w-full flex-1 -translate-y-[1.375rem] flex-col items-center justify-center gap-y-4">
        <div className="relative flex h-[65vh] w-full items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={images[page]}
              custom={direction}
              variants={SLIDE_ANIMATION}
              initial="enter"
              animate="center"
              exit="exit"
              transition={CARD_ANIMATION.transition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={handleDragEnd}
              className="absolute h-auto w-full"
            />
          </AnimatePresence>
        </div>
        <PageIndicator
          total={images.length}
          current={page + 1}
          indicatorColor="bg-primary-400"
          onIndicatorClick={(index) => setPage([index, index > page ? 1 : -1])}
        />
      </div>
    </div>
  );
};
