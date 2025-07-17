import { linkBridge } from "@webview-bridge/web";

import type { AppBridge } from "@/types/bridge/bridge.types";

export const bridge = linkBridge<AppBridge>({
  onReady: () => {
    // 확인용
    alert("브릿지 연결 성공");
  },
  initialBridge: {
    isLoggedIn: false,
  },
  timeout: 1000 * 60 * 10, // 10분
});
