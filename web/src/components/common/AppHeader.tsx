import Notification_On from "@/assets/icons/notification_on.svg?react";
import Prev from "@/assets/icons/prev.svg?react";
import Write from "@/assets/icons/write.svg?react";
//import Notification_Off from "@/assets/icons/notification_off.svg?react";
export interface AppHeaderProps {
  title: string;
  onSkip?: () => void;
  onPrev?: () => void;
  onWrite?: () => void;
  onNotification?: () => void;
}
export const AppHeader = ({
  title,
  onSkip,
  onPrev,
  onWrite,
  onNotification,
}: AppHeaderProps) => {
  return (
    <header className="bg-bg-100 fixed z-10 w-full max-w-lg py-2">
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
        {onNotification && (
          <button
            type="button"
            aria-label="알림"
            onClick={onNotification}
            className="h-8 w-8"
          >
            {/* 알림은 추후에 기능에 따라 컴포넌트로 변경해도 될 것으로 보입니다 */}
            <Notification_On className="text-base-0 h-8 w-8" />
          </button>
        )}
      </div>
    </header>
  );
};
