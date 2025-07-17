import { login } from "@react-native-seoul/kakao-login";
import { postSocialLogin } from "@/apis/postSocialLogin";
import type { SocialLoginResult } from "@/bridge";
import { authStorage } from "@/services/authStorage";

export const performKakaoLogin = async (): Promise<SocialLoginResult> => {
  console.log("[NATIVE] 1. performKakaoLogin 함수 시작");
  try {
    const kakaoResult = await login();
    console.log("[NATIVE] 2. 카카오 SDK 로그인 성공. 토큰 수신:", kakaoResult);

    if (!kakaoResult.idToken || !kakaoResult.accessToken) {
      throw new Error("카카오로부터 토큰을 받지 못했습니다.");
    }

    console.log("[NATIVE] 3. 자체 서버에 로그인 요청 시작");
    // 현재 자체 서버 로그인 요청까지는 로그에 찍히고, 이후 서버 로그인에 실패했다는 메시지를 받음
    const { accessToken, refreshToken } = await postSocialLogin({
      provider: "kakao",
      idToken: kakaoResult.idToken,
      accessToken: kakaoResult.accessToken,
    });
    console.log("[NATIVE] 4. 자체 서버 로그인 성공. 토큰 저장 시작");

    await authStorage.setTokens(accessToken, refreshToken);
    console.log("[NATIVE] 5. 토큰 저장 완료. 성공 결과 반환");

    return {
      success: true,
      accessToken: accessToken,
    };
  } catch (error) {
    // 🚨 만약 이 로그가 보인다면, try 블록 안에서 에러가 발생한 것입니다.
    console.error("[NATIVE] 🚨 CATCH 블록 실행됨:", error);
    const message =
      error instanceof Error ? error.message : "알 수 없는 오류 발생";
    return {
      success: false,
      message,
    };
  }
};
