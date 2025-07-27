import { useLocation, Outlet } from "react-router-dom";

import { path } from "@/routes/path";

import { BottomNavBar } from "@/components/common/BottomNavBar";

const HIDDEN_PATHS = [
  path.community.write,
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
