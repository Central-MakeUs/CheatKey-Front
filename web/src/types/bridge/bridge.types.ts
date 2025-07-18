import type { BridgeStore } from "@webview-bridge/web";

export type SocialType = "kakao" | "apple";

export interface SocialLoginResult {
  userState: "ACTIVE" | "PENDING" | "SUSPENDED";
  grantType: "Bearer";
  accessToken: string;
  refreshToken: string;
}

export interface SuccessBridgeResult {
  success: true;
  data: SocialLoginResult;
}

export interface FailureBridgeResult {
  success: false;
  message: string;
}

export type BridgeLoginResult = SuccessBridgeResult | FailureBridgeResult;

export interface AppBridgeState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  isLoggedIn: boolean;
}

export interface AppBridge extends BridgeStore<AppBridgeState> {
  // 네이티브 브릿지가 제공하는 함수들
  socialLogin: (type: SocialType) => Promise<BridgeLoginResult>;
  getAccessToken: () => Promise<{ accessToken: string | null }>;
  refreshTokens: () => Promise<{ accessToken: string | null }>;
}
