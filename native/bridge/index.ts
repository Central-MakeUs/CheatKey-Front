import {
  Bridge,
  bridge,
  postMessageSchema,
} from "@webview-bridge/react-native";
import { z } from "zod";
import { performKakaoLogin } from "@/social/performKakaoLogin";
import type { SocialType } from "@/apis/axios-instance";
import { authStorage } from "@/services/authStorage";

// 웹으로 전달할 로그인 결과 타입 정의
export interface SocialLoginResult {
  success: boolean;
  accessToken?: string;
  message?: string;
}

interface AppBridgeType extends Bridge {
  isLoggedIn: boolean;
  socialLogin: (type: SocialType) => Promise<SocialLoginResult>;
  getAccessToken: () => Promise<{ accessToken: string | null }>;
  refreshTokens: () => Promise<{ accessToken: string | null }>;
}

// 브릿지 생성
export const appBridge = bridge<AppBridgeType>((store) => ({
  // 초기 상태 값
  isLoggedIn: false,

  // 웹에서 `bridge.socialLogin()` 호출 시 아래 함수 실행
  socialLogin: async (type: SocialType) => {
    let result: SocialLoginResult;
    // 추후 애플 로그인 추가해야함
    if (type === "kakao") {
      result = await performKakaoLogin();
    } else {
      result = {
        success: false,
        message: "지원하지 않는 로그인 방식입니다.",
      };
    }

    if (result.success) {
      store.set({ isLoggedIn: true }); // 성공 시 브릿지 내부 상태 변경
    }
    return result;
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
    validate: (data) =>
      z
        .object({
          type: z.enum(["kakao", "apple"]),
        })
        .parse(data),
  },
  getAccessToken: {
    validate: () => z.object({}).parse({}),
  },
  refreshTokens: {
    validate: () => z.object({}).parse({}),
  },
});

export type AppBridge = typeof appBridge;
