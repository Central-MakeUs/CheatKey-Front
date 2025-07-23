import { createContext, useState, type ReactNode } from "react";

interface FontSizeContextType {
  isFontSizeLarge: boolean;
  toggleFontSize: () => void;
}

export const FontSizeContext = createContext<FontSizeContextType | null>(null);

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [isFontSizeLarge, setIsFontSizeLarge] = useState(false);

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
