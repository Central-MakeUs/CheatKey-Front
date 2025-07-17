import { isAxiosError } from "axios";
import { AppTokens, baseAPI, RequestSocialLoginBody } from "./axios-instance";

export const postSocialLogin = async ({
  provider,
  idToken,
  accessToken,
}: RequestSocialLoginBody): Promise<AppTokens> => {
  try {
    // TODO: @Ki-Tak 서버 요청 경로 확정에 따라 변경해야함
    const response = await baseAPI.post("/auth/login", {
      provider,
      idToken,
      accessToken,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "서버 로그인에 실패했습니다."
      );
    }

    throw new Error("서버 통신 중 오류가 발생했습니다.");
  }
};
