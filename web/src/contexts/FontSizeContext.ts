import { createContext } from "react";

export interface FontSizeContextType {
  isFontSizeLarge: boolean;
  toggleFontSize: () => void;
}

export const FontSizeContext = createContext<FontSizeContextType>({
  isFontSizeLarge: false,
  toggleFontSize: () => {},
});
