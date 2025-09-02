import { createContext, useState, useContext, type ReactNode } from "react";

type FontSizeContextType = {
  isFontSizeLarge: boolean;
  toggleFontSize: () => void;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(
  undefined,
);

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [isFontSizeLarge, setIsFontSizeLarge] = useState<boolean>(false);

  const toggleFontSize = () => {
    setIsFontSizeLarge((prev) => !prev);
  };

  const value = { isFontSizeLarge, toggleFontSize };

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error(
      "useFontSize는 반드시 FontSizeProvider 안에서 사용해야 합니다.",
    );
  }
  return context;
};
