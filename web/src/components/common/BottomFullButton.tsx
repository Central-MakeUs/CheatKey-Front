import { cn } from "@/utils/cn";

export interface BottomFullButtonProps {
  state: boolean;
  onClick?: () => void;
  content: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}
export const BottomFullButton = ({
  state = true,
  onClick,
  content,
  type = "button",
  className,
}: BottomFullButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={!state}
      className={cn(
        "w-full rounded-xl py-3.5",
        {
          "bg-primary-400 text-base-0 body-1-bold": state,
          "bg-base-50 text-gray-system-500 body-2-medium": !state,
        },
        className,
      )}
    >
      {content}
    </button>
  );
};
