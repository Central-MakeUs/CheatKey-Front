import { useEffect, useState } from "react";

import ToTopIcon from "@/assets/icons/arrow_up.svg?react";

const ToTop = () => {
  const [isToTopButtonVisible, setIsToTopButtonVisible] = useState(false);

  const handleToTopButtonScroll = () => {
    setIsToTopButtonVisible(window.scrollY > 0);
  };

  const handleToTopButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleToTopButtonScroll);
    return () => window.removeEventListener("scroll", handleToTopButtonScroll);
  }, []);

  if (!isToTopButtonVisible) return null;

  return (
    <button
      onClick={handleToTopButtonClick}
      aria-label="맨 위로 올라가기"
      className="bg-base-50 fixed right-5 bottom-[14%] z-50 h-10 w-10 rounded-xl px-2 py-[6.4px] backdrop-blur-md"
    >
      <ToTopIcon className="text-base-0 h-5 w-6" />
    </button>
  );
};

export default ToTop;
