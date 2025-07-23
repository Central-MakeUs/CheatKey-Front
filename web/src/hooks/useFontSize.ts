import { useContext } from "react";

import { FontSizeContext } from "@/contexts/FontSizeContext";

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error(
      "useFontSize는 반드시 FontSizeProvider 안에서 사용해야 합니다.",
    );
  }
  return context;
};
