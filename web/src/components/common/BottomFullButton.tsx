import { cn } from "@/utils/cn";

export interface BottomFullButtonProps {
  state: boolean;
  onClick: () => void;
  content: string;
}
export const BottomFullButton = ({
  state = true,
  onClick,
  content,
}: BottomFullButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!state}
      className={cn("body-1-bold w-full rounded-xl py-3.5", {
        "bg-primary-400 text-base-0": state,
        "bg-base-50 text-gray-system-500": !state,
      })}
    >
      {content}
    </button>
  );
};
