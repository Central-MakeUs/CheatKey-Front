import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";

import AlertIcon from "@/assets/icons/alert.svg?react";
import CheckOnIcon from "@/assets/icons/check_on.svg?react";
import WarningIcon from "@/assets/icons/warning.svg?react";

interface ToastProps {
  icon?: "warning" | "check" | "alert";
  text: string;
  position: "ai" | "write";
  onClose?: () => void;
}

const ICON_MAP = {
  warning: <WarningIcon />,
  check: <CheckOnIcon />,
  alert: <AlertIcon />,
};

const POSITION_MAP: Record<ToastProps["position"], string> = {
  ai: "1.25rem", // 20px
  write: "5.875rem", // 94px
};

export const Toast = ({
  icon = "warning",
  text,
  position,
  onClose,
}: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const hideTimer = setTimeout(() => setVisible(false), 3000);
    const removeTimer = setTimeout(() => onClose?.(), 4500);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "bg-primary-600 z-50 mx-5 flex h-[54px] items-center gap-2 rounded-xl px-4 transition-all ease-in-out",
        visible
          ? "translate-y-0 opacity-100 duration-500"
          : "translate-y-10 opacity-0 duration-1500",
      )}
      style={{
        bottom: POSITION_MAP[position],
        position: "fixed",
        left: 0,
        right: 0,
      }}
      role="alert"
    >
      {ICON_MAP[icon]}
      <p className="body-2-medium text-base-0">{text}</p>
    </div>
  );
};
