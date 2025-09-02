import { createContext, useState, useContext, type ReactNode } from "react";

type BackgroundColorContextType = {
  bgColor: string;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
};

const BackgroundColorContext = createContext<
  BackgroundColorContextType | undefined
>(undefined);

export const BackgroundColorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [bgColor, setBgColor] = useState<string>("bg-bg-100");
  const value = { bgColor, setBgColor };

  return (
    <BackgroundColorContext.Provider value={value}>
      {children}
    </BackgroundColorContext.Provider>
  );
};

export const useBackgroundColor = () => {
  const context = useContext(BackgroundColorContext);
  if (context === undefined) {
    throw new Error(
      "useBackgroundColor는 반드시 BackgroundColorProvider 안에서 사용해야 합니다.",
    );
  }
  return context;
};
