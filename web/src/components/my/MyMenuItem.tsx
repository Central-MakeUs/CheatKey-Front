import type { ReactNode } from "react";

import { Toggle } from "@/components/common/Toggle";

import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";

interface MyMenuItemProps {
  icon: ReactNode;
  label: string;
  type: "link" | "toggle";
  onClick?: () => void;
  className?: string;
}

export const MyMenuItem = ({
  icon,
  label,
  type,
  onClick,
  className,
}: MyMenuItemProps) => {
  return (
    <div
      className={`active:bg-base-50 bg-gray-system-800 ${className} flex h-16 w-full items-center justify-between px-4`}
      onClick={onClick}
      role="button"
      aria-label={label}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-gray-system-500 body-2-medium">{label}</span>
      </div>
      {type === "link" ? <ArrowRightIcon /> : <Toggle />}
    </div>
  );
};
