import { useEffect, useState } from "react";

import ToTopIcon from "@/assets/icons/arrow_up.svg";

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
      className="bg-base-50 fixed right-5 bottom-[14%] z-50 rounded-xl p-3 backdrop-blur-md"
    >
      <img src={ToTopIcon} alt="맨 위로 올라가기" />
    </button>
  );
};

export default ToTop;
