import {
  Bridge,
  bridge,
  postMessageSchema,
} from "@webview-bridge/react-native";
import { z } from "zod";
import { performKakaoLogin } from "@/social/performKakaoLogin";
import { performAppleLogin } from "@/social/performAppleLogin";

import type {
  BridgeLoginResult,
  SocialType,
  SocialLoginApiResponse,
} from "@/types/auth.types";
import { authStorage } from "@/services/authStorage";
import { postReissue } from "@/apis/postReissue";

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
      let result: SocialLoginApiResponse;

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
      await authStorage.setTokens(result.accessToken, result.refreshToken);

      return {
        success: true,
        data: {
          userState: result.userState,
          accessToken: result.accessToken,
        },
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
    try {
      const refreshToken = await authStorage.getRefreshToken();
      if (!refreshToken) {
        await authStorage.clearTokens();
        store.set({ isLoggedIn: false });

        return { accessToken: null };
      }
      const response = await postReissue({ refreshToken });

      await authStorage.setTokens(response.accessToken, response.refreshToken);

      return { accessToken: response.accessToken };
    } catch {
      await authStorage.clearTokens();

      store.set({ isLoggedIn: false });

      return { accessToken: null };
    }
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
