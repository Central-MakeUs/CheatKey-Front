import { authAPI } from "@/apis/instance";
import type { MypageDashboardResponse } from "@/types/my/my.types";

import { API_DOMAINS } from "@/constants/api/apiConstants";

export const getMypageDashboard =
  async (): Promise<MypageDashboardResponse> => {
    const response = await authAPI.get(API_DOMAINS.GET_MYPAGE_DASHBOARD);
    return response.data;
  };
