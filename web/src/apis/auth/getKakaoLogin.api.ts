import { API_DOMAINS } from "@/constants/apiConstants";
import { baseAPI } from "../axios-instance";

export const getKakaoLogin = () => {
  const response = baseAPI.get(API_DOMAINS.GET_KAKAO_LOGIN);
  return response;
};
