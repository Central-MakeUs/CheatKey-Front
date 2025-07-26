import * as AppleAuthentication from "expo-apple-authentication";
import { postSocialLogin } from "@/apis/postSocialLogin";
import type { SocialLoginResult } from "@/apis/postSocialLogin";
import { authStorage } from "@/services/authStorage";

export const performAppleLogin = async (): Promise<SocialLoginResult> => {
  try {
    const appleResult = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!appleResult.identityToken) {
      throw new Error("애플로부터 idToken을 받지 못했습니다.");
    }

    const response = await postSocialLogin({
      provider: "apple",
      idToken: appleResult.identityToken,
      // accessToken: appleResult.authorizationCode
    });

    await authStorage.setTokens(response.accessToken, response.refreshToken);

    return response;
  } catch (error) {
    throw error;
  }
};
