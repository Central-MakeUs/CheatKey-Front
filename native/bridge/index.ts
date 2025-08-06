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
import { Share } from "react-native";

interface AppBridgeType extends Bridge {
  isLoggedIn: boolean;
  socialLogin: (type: SocialType) => Promise<BridgeLoginResult>;
  getAccessToken: () => Promise<{ accessToken: string | null }>;
  refreshTokens: () => Promise<{ accessToken: string | null }>;
  shareUrl: (data: {
    url: string;
    message?: string;
  }) => Promise<{ success: boolean; message?: string }>;
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
  shareUrl: async (data) => {
    try {
      await Share.share({
        url: data.url,
        message: data.message || data.url,
      });
      return { success: true };
    } catch {
      return { success: false, message: "공유에 실패했습니다." };
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
  shareUrl: {
    validate: (data) =>
      z
        .object({
          url: z.url("공유할 URL 형식이 올바르지 않습니다."),
          message: z.string().optional(),
        })
        .parse(data),
  },
});

export type AppBridge = typeof appBridge;
