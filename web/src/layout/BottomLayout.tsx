import { useLocation, Outlet } from "react-router-dom";

import { BottomNavBar } from "@/components/common/BottomNavBar";

import { PAGE_PATH } from "@/constants/path";

const HIDDEN_PATHS = [
  PAGE_PATH.COMMUNITY.SPECIFIC.WRITE,
  /^\/community\/\d+$/,
  /^\/content\/(?:article|interview)\/[^/]+$/,
];

export const BottomLayout = () => {
  const { pathname } = useLocation();

  const hideBottomNavBar = HIDDEN_PATHS.some((p) =>
    typeof p === "string" ? p === pathname : p.test(pathname),
  );

  return (
    <div className="layout">
      <Outlet />
      {!hideBottomNavBar && <BottomNavBar />}
    </div>
  );
};
