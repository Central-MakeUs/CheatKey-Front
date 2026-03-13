import { Suspense } from "react";

import { Outlet } from "react-router-dom";

import RouteChangeTracker from "@/routes/RouteChangeTracker";

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
    <>
      <RouteChangeTracker />
      <BackgroundColorProvider>
        <ActualLayout />
      </BackgroundColorProvider>
    </>
  );
};
