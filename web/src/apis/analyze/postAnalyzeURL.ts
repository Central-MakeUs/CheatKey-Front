import { authAPI } from "@/apis/instance";
import type { AnalyzeResponse } from "@/types/analyzeResult/analyzeResult.types";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postAnalyzeURL = async ({
  text,
}: {
  text: string;
}): Promise<AnalyzeResponse> => {
  const response = await authAPI.post(API_DOMAINS.POST_ANALYZE_URL, {
    text,
  });
  return response.data;
};
