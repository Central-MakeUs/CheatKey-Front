import { authAPI } from "@/apis/instance";
import type { AnalyzeResponse } from "@/types/analyzeResult/analyzeResult.types";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postAnalyzeCase = async ({
  detectionUrl,
}: {
  detectionUrl: string;
}): Promise<AnalyzeResponse> => {
  const response = await authAPI.post(API_DOMAINS.POST_ANALYZE_CASE, {
    detectionUrl,
  });
  return response.data;
};
