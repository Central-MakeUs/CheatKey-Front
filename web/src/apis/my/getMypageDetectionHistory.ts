import { authAPI } from "@/apis/instance";
import type { MyAnalysisHistoryResponse } from "@/types/my/my.types";

import { API_DOMAINS } from "@/constants/apiConstants";

interface PageParams {
  page?: number;
  size?: number;
  sort?: string[];
  period?: "today" | "week" | "month";
}

export const getMypageDetectionHistory = async (params: PageParams) => {
  const response = await authAPI.get<MyAnalysisHistoryResponse>(
    API_DOMAINS.GET_MYPAGE_DETECTION_HISTORY,
    {
      params,
    },
  );
  return response.data;
};
