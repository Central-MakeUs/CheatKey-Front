import { login } from "@react-native-seoul/kakao-login";
import { postSocialLogin } from "@/apis/postSocialLogin";
import type { SocialLoginResult } from "@/bridge";
import { authStorage } from "@/services/authStorage";

// 카카오 로그인부터 자체 서버 인증 전체 프로세스
export const performKakaoLogin = async (): Promise<SocialLoginResult> => {
  try {
    const kakaoResult = await login();
    if (!kakaoResult.idToken || !kakaoResult.accessToken) {
      throw new Error("카카오로부터 토큰을 받지 못했습니다.");
    }

    // 받은 토큰들로 자체 서버에 로그인 요청
    const { accessToken, refreshToken } = await postSocialLogin({
      provider: "kakao",
      idToken: kakaoResult.idToken,
      accessToken: kakaoResult.accessToken,
    });

    // authStorage 저장
    await authStorage.setTokens(accessToken, refreshToken);

    // 성공 여부 반환
    return {
      success: true,
      accessToken: accessToken,
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
