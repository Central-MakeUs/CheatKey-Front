import { cn } from "@/lib/cn";

//import Notification_On from "@/assets/icons/notification_on.svg?react";
import Prev from "@/assets/icons/prev.svg?react";
import Write from "@/assets/icons/write.svg?react";
//import Notification_Off from "@/assets/icons/notification_off.svg?react";
export interface AppHeaderProps {
  title: string;
  onSkip?: () => void;
  onPrev?: () => void;
  onWrite?: () => void;
  onNotification?: () => void;
  className?: string;
}
export const AppHeader = ({
  title,
  onSkip,
  onPrev,
  onWrite,
  //onNotification,
  className,
}: AppHeaderProps) => {
  return (
    <header className={cn("fixed z-10 w-full max-w-3xl py-2", className)}>
      <div className="absolute top-1/2 left-5 flex -translate-y-1/2 items-center">
        {onPrev && (
          <button
            type="button"
            aria-label="뒤로 가기"
            onClick={onPrev}
            className="h-6 w-6"
          >
            <Prev className="text-base-0 h-6 w-6" />
          </button>
        )}
      </div>
      <h1 className="head-3-bold text-base-0 min-h-6 w-full text-center">
        {title}
      </h1>
      <div className="absolute top-1/2 right-5 flex -translate-y-1/2 items-center gap-1">
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="caption-1-medium bg-primary-400 text-base-0 rounded-full px-3.5 py-[0.1925rem]"
          >
            Skip
          </button>
        )}
        {onWrite && (
          <button
            type="button"
            aria-label="글쓰기"
            onClick={onWrite}
            className="h-8 w-8"
          >
            <Write className="text-base-0 h-8 w-8" />
          </button>
        )}
        {/** 
         * TODO: @미정 2차 배포 알림 추가 
        {onNotification && (
          <button
            type="button"
            aria-label="알림"
            onClick={onNotification}
            className="h-8 w-8"
          >
            <Notification_On className="text-base-0 h-8 w-8" />
          </button>
        )}
        */}
      </div>
    </header>
  );
};
