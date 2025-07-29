import type { BridgeStore, RawJSON } from "@webview-bridge/web";

export type UserState = "ACTIVE" | "PENDING" | "SUSPENDED";
export type SocialType = "kakao" | "apple";

export interface SuccessBridgeResult {
  success: true;
  data: {
    userState: UserState;
    accessToken: string;
  };
}

export interface FailureBridgeResult {
  success: false;
  message: string;
}

export type BridgeLoginResult = SuccessBridgeResult | FailureBridgeResult;

export interface AppState {
  [key: string]: RawJSON;
  isLoggedIn: boolean;
}

export interface NativeBridgeMethods {
  socialLogin: (type: SocialType) => Promise<BridgeLoginResult>;
  getAccessToken: () => Promise<{ accessToken: string | null }>;
  refreshTokens: () => Promise<{ accessToken: string | null }>;
}

export type AppBridgeSpec = AppState & NativeBridgeMethods;

export type AppBridge = BridgeStore<AppBridgeSpec>;
