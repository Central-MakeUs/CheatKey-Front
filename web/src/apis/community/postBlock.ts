import { authAPI } from "@/apis/instance";
import { generateApiPath } from "@/utils/generateApiPath";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postBlock = async ({ postId }: { postId: number }) => {
  const response = await authAPI.post(
    generateApiPath(API_DOMAINS.POST_BLOCK, { postId }),
    { reason: "HATE" },
  );
  console.log(response);
  return response.data;
};
