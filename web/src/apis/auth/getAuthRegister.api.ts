import { authAPI } from "@/apis/instance";

import { API_DOMAINS } from "@/constants/apiConstants";

export const getAuthRegister = () => {
  const response = authAPI.get(API_DOMAINS.GET_AUTH_REGISTER);
  return response;
};
