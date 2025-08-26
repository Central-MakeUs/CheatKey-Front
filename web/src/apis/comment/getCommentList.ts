import { authAPI } from "@/apis/instance";
import { generatePath } from "@/utils/generatePath";

import { API_DOMAINS } from "@/constants/apiConstants";

export const getCommentList = async ({ postId }: { postId: number }) => {
  const response = await authAPI.get(
    generatePath(API_DOMAINS.GET_COMMENT_LIST, { postId }),
  );

  return response.data;
};
