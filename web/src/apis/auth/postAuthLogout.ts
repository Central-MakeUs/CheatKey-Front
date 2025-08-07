import { authAPI } from "@/apis/instance";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postAuthLogout = async (): Promise<void> => {
  await authAPI.post(API_DOMAINS.POST_AUTH_LOGOUT);
};
