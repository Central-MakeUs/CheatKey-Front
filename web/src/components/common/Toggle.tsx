import { cn } from "@/lib/cn";

interface ToggleProps {
  isToggled: boolean;
  onToggle: () => void;
  className?: string;
}

export const Toggle = ({ isToggled, onToggle, className }: ToggleProps) => {
  return (
    <div className="flex items-center justify-center">
      <div
        onClick={onToggle}
        role="switch"
        aria-checked={isToggled}
        className={cn(
          "bg-base-75 relative inline-block h-6 w-10 cursor-pointer rounded-full p-0.5 transition-all duration-300",
          className,
        )}
      >
        <div
          className={cn(
            "absolute h-5 w-5 rounded-full transition-transform duration-300 ease-in-out",
            isToggled
              ? "bg-primary-400 translate-x-4 transform"
              : "bg-gray-system-600",
          )}
        ></div>
      </div>
    </div>
  );
};
