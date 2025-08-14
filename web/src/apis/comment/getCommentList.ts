import { authAPI } from "@/apis/instance";
import { generateApiPath } from "@/utils/generateApiPath";

import { API_DOMAINS } from "@/constants/apiConstants";

export const getCommentList = async ({ postId }: { postId: number }) => {
  const response = await authAPI.get(
    generateApiPath(API_DOMAINS.GET_COMMENT_LIST, { postId }),
  );

  return response.data;
};
