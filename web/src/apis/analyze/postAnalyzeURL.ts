import { authAPI } from "@/apis/instance";
import type { AnalyzeResponse } from "@/types/analyzeResult/analyzeResult.types";

import { API_DOMAINS } from "@/constants/api/apiConstants";

export const postAnalyzeURL = async ({
  detectionUrl,
}: {
  detectionUrl: string;
}): Promise<AnalyzeResponse> => {
  const response = await authAPI.post(API_DOMAINS.POST_ANALYZE_URL, {
    detectionUrl,
  });
  return response.data;
};
