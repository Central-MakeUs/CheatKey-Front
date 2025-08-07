import { login } from "@react-native-kakao/user";
import { postSocialLogin } from "@/apis/postSocialLogin";
import type { SocialLoginApiResponse } from "@/types/auth.types";
import { authStorage } from "@/services/authStorage";

export const performKakaoLogin = async (): Promise<SocialLoginApiResponse> => {
  try {
    const kakaoResult = await login();

    if (!kakaoResult.idToken || !kakaoResult.accessToken) {
      throw new Error("카카오로부터 토큰을 받지 못했습니다.");
    }

    const response = await postSocialLogin({
      provider: "kakao",
      idToken: kakaoResult.idToken,
      accessToken: kakaoResult.accessToken,
    });

    await authStorage.setTokens(response.accessToken, response.refreshToken);

    return response;
  } catch (error) {
    throw error;
  }
};
