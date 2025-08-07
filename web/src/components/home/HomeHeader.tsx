//import Notification from "@/assets/icons/notification_on.svg?react";
import CheatKeyLogo from "@/assets/logo/logo_cheatkey.svg?react";

export const HomeHeader = () => {
  return (
    <header className="h-header flex w-full items-center justify-between px-5">
      <CheatKeyLogo className="h-8 w-auto" />

      {/**
       * TODO: @미정 2차 배포 알림 기능 추가
       * <Notification className="h-8 w-8" />
       */}
    </header>
  );
};
