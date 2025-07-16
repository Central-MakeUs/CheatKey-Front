import { useEffect, useState, useMemo } from "react";

import { throttle } from "@/utils/throttle";

import ToTopIcon from "@/assets/icons/arrow_up.svg?react";

interface ToTopProps {
  bottom?: string;
}

const ToTop = ({ bottom = "7rem" }: ToTopProps) => {
  const [isToTopButtonVisible, setIsToTopButtonVisible] = useState(false);

  const throttledScrollHandler = useMemo(
    () =>
      throttle(() => {
        setIsToTopButtonVisible(window.scrollY > 0);
      }, 200),
    [],
  );

  const handleToTopButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler);
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  if (!isToTopButtonVisible) return null;

  return (
    <button
      onClick={handleToTopButtonClick}
      aria-label="맨 위로 올라가기"
      className="bg-base-50 fixed right-5 bottom-[7rem] z-50 h-10 w-10 rounded-xl px-2 py-[6.4px] backdrop-blur-md"
      style={{ bottom }}
    >
      <ToTopIcon className="text-base-0 h-5 w-6" />
    </button>
  );
};

export default ToTop;
