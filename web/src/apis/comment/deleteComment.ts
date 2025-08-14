import { authAPI } from "@/apis/instance";
import { generateApiPath } from "@/utils/generateApiPath";

import { API_DOMAINS } from "@/constants/apiConstants";

export const deleteComment = async ({ commentId }: { commentId: number }) => {
  const response = await authAPI.delete(
    generateApiPath(API_DOMAINS.DELETE_COMMENT, { commentId }),
  );

  return response.data;
};
