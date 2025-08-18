import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

import AlertIcon from "@/assets/icons/alert.svg?react";
import CheckOnIcon from "@/assets/icons/check_on.svg?react";
import WarningIcon from "@/assets/icons/warning.svg?react";

export type ToastIconType = "warning" | "check" | "alert";

interface ToastProps {
  icon?: ToastIconType;
  text: string;
  fontSize?: "sm" | "lg";
  position: "ai" | "write";
  onDone?: () => void;
}

const ICON_MAP = {
  warning: <WarningIcon className="h-6 w-6 shrink-0" />,
  check: <CheckOnIcon className="h-6 w-6 shrink-0" />,
  alert: <AlertIcon className="h-6 w-6 shrink-0" />,
};

const POSITION_MAP: Record<ToastProps["position"], string> = {
  ai: "3.5rem",
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
  fontSize = "lg",
  position,
  onDone,
}: ToastProps) => {
  const [visible, setVisible] = useState(true);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const element = document.getElementById("toast-root");
    if (element) {
      setPortalElement(element);
    }
  }, []);

  if (!portalElement) return null;

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
            "bg-primary-600 fixed z-50 mx-5 flex items-center gap-2.5 rounded-xl p-4",
          )}
          style={{
            bottom: POSITION_MAP[position],
            left: 0,
            right: 0,
          }}
          role="alert"
        >
          {ICON_MAP[icon]}
          <p
            className={cn("text-base-0", {
              "body-4-medium": fontSize === "sm",
              "body-2-medium": fontSize === "lg",
            })}
          >
            {text}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    portalElement,
  );
};
