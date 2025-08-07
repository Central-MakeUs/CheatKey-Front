import { useEffect, useState, useMemo } from "react";

import { createPortal } from "react-dom";

import { throttle } from "@/utils/throttle";

import ToTopIcon from "@/assets/icons/arrow_up.svg?react";

interface ToTopProps {
  bottom?: string;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export const ToTop = ({ bottom = "7rem", scrollContainerRef }: ToTopProps) => {
  const [isToTopButtonVisible, setIsToTopButtonVisible] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const throttledScrollHandler = useMemo(
    () =>
      throttle(() => {
        let isScrolled = false;

        if (scrollContainerRef?.current) {
          isScrolled = scrollContainerRef.current.scrollTop > 0;
        } else {
          isScrolled = window.scrollY > 0;
        }
        setIsToTopButtonVisible(isScrolled);
      }, 200),
    [scrollContainerRef],
  );

  const handleToTopButtonClick = () => {
    const target = scrollContainerRef?.current || window;
    target.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const element = document.getElementById("to-top-root");
    if (element) {
      setPortalElement(element);
    }
  }, []);

  useEffect(() => {
    const target = scrollContainerRef?.current || window;
    target.addEventListener("scroll", throttledScrollHandler);
    return () => {
      target.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [scrollContainerRef, throttledScrollHandler]);

  if (!isToTopButtonVisible || !portalElement) return null;

  return createPortal(
    <button
      onClick={handleToTopButtonClick}
      aria-label="맨 위로 올라가기"
      className="bg-base-50 fixed right-5 bottom-28 z-45 h-10 w-10 rounded-xl px-2 py-[6.4px] backdrop-blur-md"
      style={{ bottom }}
    >
      <ToTopIcon className="text-base-0 h-5 w-6" />
    </button>,
    portalElement,
  );
};
