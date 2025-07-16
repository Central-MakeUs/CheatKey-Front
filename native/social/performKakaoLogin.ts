import { login } from "@react-native-seoul/kakao-login";
import { postSocialLogin } from "@/apis/postSocialLogin";
import type { SocialLoginResult } from "@/bridge";

// 카카오 로그인부터 자체 서버 인증 전체 프로세스
export const performKakaoLogin = async (): Promise<SocialLoginResult> => {
  try {
    const kakaoResult = await login();
    if (!kakaoResult.idToken || !kakaoResult.accessToken) {
      throw new Error("카카오로부터 토큰을 받지 못했습니다.");
    }

    // 받은 토큰들로 자체 서버에 로그인 요청
    const appTokens = await postSocialLogin({
      provider: "kakao",
      idToken: kakaoResult.idToken,
      accessToken: kakaoResult.accessToken,
    });

    return {
      success: true,
      tokens: appTokens,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "알 수 없는 오류 발생";
    return {
      success: false,
      message,
    };
  }
};
