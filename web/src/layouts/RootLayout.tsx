import { Suspense } from "react";

import { Outlet } from "react-router-dom";

import {
  BackgroundColorProvider,
  useBackgroundColor,
} from "@/contexts/BackgroundColorContext";

import { LoadingScreen } from "@/components/animation/LoadingScreen";

const ActualLayout = () => {
  const { bgColor } = useBackgroundColor();

  return (
    <div className={`layout safearea ${bgColor}`}>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export const RootLayout = () => {
  return (
    <BackgroundColorProvider>
      <ActualLayout />
    </BackgroundColorProvider>
  );
};
