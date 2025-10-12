import { authAPI } from "@/apis/instance";
import { generatePath } from "@/utils/generatePath";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postBlockComment = async ({
  commentId,
}: {
  commentId: number;
}) => {
  const response = await authAPI.post(
    generatePath(API_DOMAINS.POST_BLOCK_COMMENT, { commentId }),
    { reason: "HATE" },
  );
  return response.data;
};
