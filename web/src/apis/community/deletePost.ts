import { generateApiPath } from "@/utils/generateApiPath";

import { API_DOMAINS } from "@/constants/apiConstants";

import { authAPI } from "../instance";

export const deletePost = async ({ postId }: { postId: number }) => {
  const response = await authAPI.delete(
    generateApiPath(API_DOMAINS.DELETE_COMMUNITY_POST, { postId }),
  );
  return response.data;
};
