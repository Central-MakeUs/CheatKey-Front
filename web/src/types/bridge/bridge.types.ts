import type { BridgeStore } from "@webview-bridge/web";

export type SocialType = {
  type: "kakao" | "apple";
};

export interface SocialLoginResult {
  success: boolean;
  message?: string;
}
export interface AppBridgeState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  isLoggedIn: boolean;
}

export interface AppBridge extends BridgeStore<AppBridgeState> {
  // 네이티브 브릿지가 제공하는 함수들
  socialLogin: (type: SocialType) => Promise<SocialLoginResult>;
  getAccessToken: () => Promise<{ accessToken: string | null }>;
  refreshTokens: () => Promise<{ accessToken: string | null }>;
}
