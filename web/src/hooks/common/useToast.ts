import { useState } from "react";

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string, duration: number = 3500) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  };

  return { toastMessage, showToast };
};
