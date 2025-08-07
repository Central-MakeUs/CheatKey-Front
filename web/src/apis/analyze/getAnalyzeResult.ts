import { authAPI } from "@/apis/instance";
import { generateApiPath } from "@/utils/generateApiPath";

import type {
  ANALYSIS_CATEGORY,
  ANALYSIS_STATUS,
} from "@/constants/analyze/result";
import { API_DOMAINS } from "@/constants/apiConstants";

export interface GetAnalyzeResultResponse {
  id: number;
  status: (typeof ANALYSIS_STATUS)[keyof typeof ANALYSIS_STATUS];
  detectionType: (typeof ANALYSIS_CATEGORY)[keyof typeof ANALYSIS_CATEGORY];
  inputText: string;
  topScore: number;
  matchedCaseId: string;
  detectedAt: string;
}

export const getAnalyzeResult = async ({
  detectionId,
}: {
  detectionId: number;
}): Promise<GetAnalyzeResultResponse> => {
  const response = await authAPI.get(
    generateApiPath(API_DOMAINS.GET_ANALYZE_RESULT, { detectionId }),
  );
  return response.data;
};
