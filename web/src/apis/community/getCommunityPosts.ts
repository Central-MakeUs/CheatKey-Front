import { authAPI } from "@/apis/instance";
import type { CommunityPost } from "@/types/community/community.types";

import { API_DOMAINS } from "@/constants/apiConstants";

interface CommunityPostsResponse {
  content: CommunityPost[];
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  number: number;
  size: number;
}

interface SearchParams {
  keyword: string;
  sort?: string;
  page: number;
  size: number;
}

export const getCommunityPosts = async (
  params: SearchParams,
): Promise<CommunityPostsResponse> => {
  const response = await authAPI.get(API_DOMAINS.GET_COMMUNITY_POSTS, {
    params,
  });
  return response.data;
};
