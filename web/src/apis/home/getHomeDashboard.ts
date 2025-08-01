import { authAPI } from "@/apis/instance";

import { API_DOMAINS } from "@/constants/apiConstants";

export const getHomeDashboard = () => {
  const response = authAPI.get(API_DOMAINS.GET_HOME_DASHBOARD);
  return response;
};
