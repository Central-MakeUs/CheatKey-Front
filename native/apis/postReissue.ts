import { isAxiosError } from "axios";
import { baseAPI } from "@/apis/instance";

export interface RequestReissueBody {
  refreshToken: string;
}

export interface ReissueResult {
  userState: "ACTIVE" | "PENDING" | "SUSPENDED";
  grantType: "Bearer";
  accessToken: string;
  refreshToken: string;
}

export const postReissue = async ({
  refreshToken,
}: RequestReissueBody): Promise<ReissueResult> => {
  try {
    const authorizationToken = `Bearer ${refreshToken}`;

    const response = await baseAPI.post(
      "/v1/api/auth/refresh",
      { refreshToken },
      {
        headers: {
          Authorization: authorizationToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data || "토큰 재발급에 실패하였습니다.");
    }

    throw new Error("서버 통신 중 오류가 발생했습니다.");
  }
};
