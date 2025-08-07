import { authAPI } from "@/apis/instance";
import { generateApiPath } from "@/utils/generateApiPath";

import { API_DOMAINS } from "@/constants/apiConstants";

export const getAnalyzeResult = async ({
  detectionId,
}: {
  detectionId: number;
}) => {
  const response = await authAPI.get(
    generateApiPath(API_DOMAINS.GET_ANALYZE_RESULT, { detectionId }),
  );
  return response.data;
};
