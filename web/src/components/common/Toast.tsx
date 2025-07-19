import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

import AlertIcon from "@/assets/icons/alert.svg?react";
import CheckOnIcon from "@/assets/icons/check_on.svg?react";
import WarningIcon from "@/assets/icons/warning.svg?react";

interface ToastProps {
  icon?: "warning" | "check" | "alert";
  text: string;
  position: "ai" | "write";
  onDone?: () => void;
}

const ICON_MAP = {
  warning: <WarningIcon />,
  check: <CheckOnIcon />,
  alert: <AlertIcon />,
};

const POSITION_MAP: Record<ToastProps["position"], string> = {
  ai: "1.25rem",
  write: "5.875rem",
};

const toastVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
};

export const Toast = ({
  icon = "warning",
  text,
  position,
  onDone,
}: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return createPortal(
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="toast"
          variants={toastVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className={cn(
            "bg-primary-600 fixed z-50 mx-5 flex h-[3.375rem] items-center gap-2 rounded-xl px-4",
          )}
          style={{
            bottom: POSITION_MAP[position],
            left: 0,
            right: 0,
          }}
          role="alert"
        >
          {ICON_MAP[icon]}
          <p className="body-2-medium text-base-0">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
