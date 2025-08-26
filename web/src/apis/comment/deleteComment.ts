import { authAPI } from "@/apis/instance";
import { generatePath } from "@/utils/generatePath";

import { API_DOMAINS } from "@/constants/apiConstants";

export const deleteComment = async ({ commentId }: { commentId: number }) => {
  const response = await authAPI.delete(
    generatePath(API_DOMAINS.DELETE_COMMENT, { commentId }),
  );

  return response.data;
};
