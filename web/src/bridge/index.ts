import { linkBridge } from "@webview-bridge/web";

import type { AppBridge } from "@/types/bridge/bridge.types";

export const bridge = linkBridge<AppBridge>({
  onReady: () => {
    // 확인용
    console.log("브릿지 연결 성공");
    subscribeSafeAreaInsets();
  },
  initialBridge: {
    isLoggedIn: false,
    safeAreaTop: 0,
    safeAreaRight: 0,
    safeAreaBottom: 0,
    safeAreaLeft: 0,
  },
  timeout: 1000 * 60 * 10, // 10분
});
function subscribeSafeAreaInsets() {
  // 브릿지 상태 변경을 구독
  bridge.store.subscribe((state) => {
    if (
      typeof state.safeAreaTop === "number" &&
      typeof state.safeAreaRight === "number" &&
      typeof state.safeAreaBottom === "number" &&
      typeof state.safeAreaLeft === "number"
    ) {
      updateSafeAreaCSS(
        state.safeAreaTop,
        state.safeAreaRight,
        state.safeAreaBottom,
        state.safeAreaLeft,
      );
    }
  });

  const currentState = bridge.store.getState();
  if (currentState) {
    updateSafeAreaCSS(
      currentState.safeAreaTop || 0,
      currentState.safeAreaRight || 0,
      currentState.safeAreaBottom || 0,
      currentState.safeAreaLeft || 0,
    );
  }
}

function updateSafeAreaCSS(
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  const root = document.documentElement;

  root.style.setProperty("--safe-area-inset-top", `${top}px`);
  root.style.setProperty("--safe-area-inset-right", `${right}px`);
  root.style.setProperty("--safe-area-inset-bottom", `${bottom}px`);
  root.style.setProperty("--safe-area-inset-left", `${left}px`);
}
