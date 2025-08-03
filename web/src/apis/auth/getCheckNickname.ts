import { authAPI } from "@/apis/instance";

import { API_DOMAINS } from "@/constants/apiConstants";

export const getCheckNickname = async ({ nickname }: { nickname: string }) => {
  const response = await authAPI.get(API_DOMAINS.GET_CHECK_NICKNAME, {
    params: {
      nickname,
    },
  });
  return response.data;
};
