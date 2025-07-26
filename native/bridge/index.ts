import {
  Bridge,
  bridge,
  postMessageSchema,
} from "@webview-bridge/react-native";
import { z } from "zod";
import { performKakaoLogin } from "@/social/performKakaoLogin";
import { performAppleLogin } from "@/social/performAppleLogin";

import type { SocialLoginResult, SocialType } from "@/apis/postSocialLogin";
import { authStorage } from "@/services/authStorage";

export interface SuccessBridgeResult {
  success: true;
  data: SocialLoginResult;
}

export interface FailureBridgeResult {
  success: false;
  message: string;
}

export type BridgeLoginResult = SuccessBridgeResult | FailureBridgeResult;

interface AppBridgeType extends Bridge {
  isLoggedIn: boolean;
  socialLogin: (type: SocialType) => Promise<BridgeLoginResult>;
  getAccessToken: () => Promise<{ accessToken: string | null }>;
  refreshTokens: () => Promise<{ accessToken: string | null }>;
}

export const appBridge = bridge<AppBridgeType>((store) => ({
  isLoggedIn: false,

  socialLogin: async (type: SocialType): Promise<BridgeLoginResult> => {
    try {
      let result: SocialLoginResult;

      if (type === "kakao") {
        result = await performKakaoLogin();
      } else if (type === "apple") {
        result = await performAppleLogin();
      } else {
        return {
          success: false,
          message: "지원하지 않는 로그인 방식입니다.",
        };
      }

      store.set({ isLoggedIn: true });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "브릿지 통신 오류",
      };
    }
  },

  getAccessToken: async () => {
    const accessToken = await authStorage.getAccessToken();
    return { accessToken };
  },

  refreshTokens: async () => {
    // TODO: @Ki-Tak 추후에 재발급 엔드포인트 생기면 추가 예정
    console.log("미완성 기능");

    return { accessToken: null };
  },
}));

// 웹에서 보낸 데이터의 유효성 검사 스키마
export const appSchema = postMessageSchema({
  socialLogin: {
    validate: (data) => z.enum(["kakao", "apple"]).parse(data),
  },
  getAccessToken: {
    validate: () => z.object({}).parse({}),
  },
  refreshTokens: {
    validate: () => z.object({}).parse({}),
  },
});

export type AppBridge = typeof appBridge;
