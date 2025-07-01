import { cn } from "@/utils/cn";

export interface BottomSignupButtonProps {
  state: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
  leftContent: string;
  rightContent: string;
}
export const BottomSignupButton = ({
  state = true,
  onLeftClick,
  onRightClick,
  leftContent,
  rightContent,
}: BottomSignupButtonProps) => {
  return (
    <div className="flex w-full gap-3.5">
      <button
        type="button"
        onClick={onLeftClick}
        disabled={!state}
        className="body-1-bold bg-base-50 text-gray-system-500 w-31/100 rounded-xl py-3.5"
      >
        {leftContent}
      </button>
      <button
        type="button"
        onClick={onRightClick}
        disabled={!state}
        className={cn("body-1-bold w-69/100 rounded-xl py-3.5", {
          "bg-primary-400 text-base-0": state,
          "bg-base-50 text-gray-system-700": !state,
        })}
      >
        {rightContent}
      </button>
    </div>
  );
};
