import { isAxiosError } from "axios";
import { baseAPI } from "@/apis/axios-instance";

export type SocialType = "kakao" | "apple";

export interface RequestSocialLoginBody {
  provider: SocialType;
  idToken: string;
  accessToken?: string;
}

export interface SocialLoginResult {
  userState: "ACTIVE" | "PENDING" | "SUSPENDED";
  grantType: "Bearer";
  accessToken: string;
  refreshToken: string;
}

export const postSocialLogin = async ({
  provider,
  idToken,
  accessToken,
}: RequestSocialLoginBody): Promise<SocialLoginResult> => {
  try {
    const response = await baseAPI.post("/v1/api/auth/login", {
      provider,
      idToken,
      accessToken,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data || "서버 로그인에 실패했습니다.");
    }

    throw new Error("서버 통신 중 오류가 발생했습니다.");
  }
};
