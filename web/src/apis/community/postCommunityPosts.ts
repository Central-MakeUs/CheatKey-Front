import { authAPI } from "@/apis/instance";
import type { CommunityPost } from "@/types/community/community.types";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postCommunityPosts = async (): Promise<CommunityPost> => {
  const response = await authAPI.post(API_DOMAINS.POST_COMMUNITY_POSTS);
  return response.data;
};
