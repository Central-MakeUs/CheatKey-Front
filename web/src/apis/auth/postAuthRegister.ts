import { authAPI } from "@/apis/instance";
import type { RegisterRequest } from "@/types/signup/signup.types";

import { API_DOMAINS } from "@/constants/api/apiConstants";

export const postAuthRegister = async (payload: RegisterRequest) => {
  const response = await authAPI.post(API_DOMAINS.AUTH_REGISTER, payload);
  return response.data;
};
