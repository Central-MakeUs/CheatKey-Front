import { Suspense } from "react";

import { Outlet } from "react-router-dom";

import { LoadingScreen } from "@/components/animation/LoadingScreen";

export const RootLayout = () => {
  return (
    <div className="layout">
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
