import * as AppleAuthentication from "expo-apple-authentication";
import { postSocialLogin } from "@/apis/postSocialLogin";
import type { SocialLoginApiResponse } from "@/types/auth.types";
import { authStorage } from "@/services/authStorage";

export const performAppleLogin = async (): Promise<SocialLoginApiResponse> => {
  try {
    const appleResult = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!appleResult.identityToken || !appleResult.authorizationCode) {
      throw new Error("애플로부터 토큰을 받지 못했습니다.");
    }

    const response = await postSocialLogin({
      provider: "apple",
      idToken: appleResult.identityToken,
      accessToken: appleResult.authorizationCode,
    });

    await authStorage.setTokens(response.accessToken, response.refreshToken);

    return response;
  } catch (error) {
    throw error;
  }
};
