// @ts-nocheck
import { useEffect } from "react";

interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const applySafeAreaInsets = (insets: SafeAreaInsets) => {
  const root = document.documentElement;
  root.style.setProperty("--safe-area-inset-top", `${insets.top}px`);
  root.style.setProperty("--safe-area-inset-right", `${insets.right}px`);
  root.style.setProperty("--safe-area-inset-bottom", `${insets.bottom}px`);
  root.style.setProperty("--safe-area-inset-left", `${insets.left}px`);
};

export const useSafeAreaListener = () => {
  useEffect(() => {
    const handleMessage = (event: Event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data);

        if (data.type === "safeAreaInsets") {
          applySafeAreaInsets(data.insets);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const handleWindowMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "safeAreaInsets") {
          applySafeAreaInsets(data.insets);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (window.ReactNativeWebView) {
      document.addEventListener("message", handleMessage);

      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "requestSafeAreaInsets" }),
      );
    }

    window.addEventListener("message", handleWindowMessage);

    return () => {
      document.removeEventListener("message", handleMessage);
      window.removeEventListener("message", handleWindowMessage);
    };
  }, []);
};
