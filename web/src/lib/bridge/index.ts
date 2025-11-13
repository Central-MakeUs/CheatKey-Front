import { linkBridge } from "@webview-bridge/web";

import type { AppBridge } from "@/types/bridge/bridge.types";

export const bridge = linkBridge<AppBridge>({
  initialBridge: {
    isLoggedIn: false,
  },
  timeout: 1000 * 60 * 10, // 10분
});
