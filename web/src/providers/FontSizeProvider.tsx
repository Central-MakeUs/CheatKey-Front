import { useState, type ReactNode } from "react";

import {
  FontSizeContext,
  type FontSizeContextType,
} from "@/contexts/FontSizeContext";

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [isFontSizeLarge, setIsFontSizeLarge] = useState(false);

  const toggleFontSize = () => {
    setIsFontSizeLarge((prev) => !prev);
  };

  const value: FontSizeContextType = {
    isFontSizeLarge,
    toggleFontSize,
  };

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
};
