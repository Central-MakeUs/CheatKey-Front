import {
  Bridge,
  bridge,
  postMessageSchema,
} from "@webview-bridge/react-native";
import { z } from "zod";
import { performKakaoLogin } from "@/social/performKakaoLogin";
import type { AppTokens, SocialType } from "@/apis/axios-instance";

// 웹으로 전달할 로그인 결과 타입 정의
export interface SocialLoginResult {
  success: boolean;
  tokens?: AppTokens;
  message?: string;
}

interface AppBridgeType extends Bridge {
  isLoggedIn: boolean;
  socialLogin: (type: SocialType) => Promise<SocialLoginResult>;
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
});

export type AppBridge = typeof appBridge;
