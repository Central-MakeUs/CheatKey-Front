import { useLocation, Outlet } from "react-router-dom";

import { path } from "@/routes/path";

import { BottomNavBar } from "@/components/common/BottomNavBar";

const HIDDEN_PATHS = [
  //TODO: @tifsy HIDDEN_PATHS 로그인, 회원가입 주석 해제
  // path.auth.login,
  // path.auth.signup,
  path.community.write,
  /^\/community\/\d+$/,
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
