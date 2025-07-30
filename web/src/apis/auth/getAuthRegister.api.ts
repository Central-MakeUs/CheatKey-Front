import { authAPI } from "@/apis/instance";
import type { RegisterResponse } from "@/types/signup/signup.types";

import { API_DOMAINS } from "@/constants/apiConstants";

export const getAuthRegister = async (): Promise<RegisterResponse> => {
  const response = await authAPI.get<RegisterResponse>(
    API_DOMAINS.GET_AUTH_REGISTER,
  );
  return response.data;
};
