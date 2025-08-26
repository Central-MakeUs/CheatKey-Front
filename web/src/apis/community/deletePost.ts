import { authAPI } from "@/apis/instance";
import { generatePath } from "@/utils/generatePath";

import { API_DOMAINS } from "@/constants/apiConstants";

export const deletePost = async ({ postId }: { postId: number }) => {
  const response = await authAPI.delete(
    generatePath(API_DOMAINS.DELETE_COMMUNITY_POST, { postId }),
  );
  return response.data;
};
