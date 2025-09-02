import { Outlet } from "react-router-dom";

import { BottomNavBar } from "@/components/common/BottomNavBar";

export const BottomLayout = () => {
  return (
    <>
      <Outlet />
      <BottomNavBar />
    </>
  );
};
