import { authAPI } from "@/apis/instance";
import { generatePath } from "@/utils/generatePath";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postBlockPost = async ({ postId }: { postId: number }) => {
  const response = await authAPI.post(
    generatePath(API_DOMAINS.POST_BLOCK_POST, { postId }),
    { reason: "HATE" },
  );
  return response.data;
};
