import { authAPI } from "@/apis/instance";
import type { AnalyzeResponse } from "@/types/analyzeResult/analyzeResult.types";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postAnalyzeCase = async ({
  text,
}: {
  text: string;
}): Promise<AnalyzeResponse> => {
  const response = await authAPI.post(API_DOMAINS.POST_ANALYZE_CASE, {
    text,
  });
  return response.data;
};
