import { useEffect, useState, useRef, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import type { HomeBannerData } from "@/types/home/home.types";

import { CARD_ANIMATION } from "@/constants/animation/cardAnimationConstants";
import { SLIDE_ANIMATION } from "@/constants/animation/slideAnimation";
interface HomeBannerListProps {
  banners: HomeBannerData[];
}

export const HomeBannerList = ({ banners }: HomeBannerListProps) => {
  const navigate = useNavigate();

  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const intervalRef = useRef<number>(null);

  const paginate = useCallback(
    (newDirection: number) => {
      setCurrentIndex((prev) => {
        const [prevIndex] = prev;
        const newIndex =
          (prevIndex + newDirection + banners.length) % banners.length;
        return [newIndex, newDirection];
      });
    },
    [banners.length],
  );

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (banners.length <= 1) return;
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      paginate(1);
    }, 6000);
  }, [banners.length, paginate, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [banners.length, currentIndex, startAutoPlay, stopAutoPlay]);

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

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative flex h-19 w-full items-center overflow-hidden rounded-xl bg-[#212738]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.a
          key={currentIndex}
          className="absolute inset-0 flex cursor-pointer items-center gap-3"
          custom={direction}
          variants={SLIDE_ANIMATION}
          initial="enter"
          animate="center"
          exit="exit"
          transition={CARD_ANIMATION.transition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragStart={stopAutoPlay}
          onDragEnd={handleDragEnd}
          onClick={() => navigate(banners[currentIndex].navigate)}
        >
          <img
            src={banners[currentIndex].image}
            className="h-19 w-auto shrink-0"
            alt={banners[currentIndex].title}
          />
          <div className="flex flex-col gap-[0.1825rem]">
            <h1 className="body-4-medium text-gray-system-100">
              {banners[currentIndex].title}
            </h1>
            <p className="caption-2-regular text-primary-200">
              {banners[currentIndex].content}
            </p>
          </div>
        </motion.a>
      </AnimatePresence>

      <div className="caption-1-medium text-gray-system-500 bg-base-100/50 shadow-shadow-1 absolute right-[0.6875rem] bottom-[0.4375rem] flex h-6 w-12 items-center rounded-full px-2.5 text-center tracking-[0.25rem]">
        {currentIndex + 1}/{banners.length}
      </div>
    </div>
  );
};
