import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

import { Toggle } from "@/components/common/Toggle";

import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";

interface MyMenuItemProps {
  icon: ReactNode;
  label: string;
  type: "link" | "toggle";
  onClick?: () => void;
  className?: string;
  isToggled?: boolean;
  onToggle?: () => void;
}

export const MyMenuItem = ({
  icon,
  label,
  type,
  onClick,
  className,
  isToggled,
  onToggle,
}: MyMenuItemProps) => {
  return (
    <div
      className={cn(
        "active:bg-base-50 bg-gray-system-800 flex h-16 w-full items-center justify-between px-4",
        className,
      )}
      onClick={onClick}
      role="button"
      aria-label={label}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-gray-system-500 body-2-medium">{label}</span>
      </div>
      {type === "link" ? (
        <ArrowRightIcon />
      ) : (
        <Toggle
          isToggled={isToggled ?? false}
          onToggle={onToggle ?? (() => {})}
        />
      )}
    </div>
  );
};
