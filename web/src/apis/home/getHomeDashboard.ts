import { authAPI } from "@/apis/instance";
import type { HomeDashboardResponse } from "@/types/home/home.types";

import { API_DOMAINS } from "@/constants/apiConstants";

export const getHomeDashboard = async (): Promise<HomeDashboardResponse> => {
  const response = await authAPI.get(API_DOMAINS.GET_HOME_DASHBOARD);
  return response.data;
};
