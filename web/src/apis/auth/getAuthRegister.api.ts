import { API_DOMAINS } from "@/constants/apiConstants";

import { baseAPI } from "../axios-instance";

export const getAuthRegister = () => {
  const response = baseAPI.get(API_DOMAINS.GET_AUTH_REGISTER);
  return response;
};
