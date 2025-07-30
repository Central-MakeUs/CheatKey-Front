import { authAPI } from "@/apis/instance";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postAuthRegister = async () => {
  const response = await authAPI.post(API_DOMAINS.AUTH_REGISTER);
  return response.data;
};
