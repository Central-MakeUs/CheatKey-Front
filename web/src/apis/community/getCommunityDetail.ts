import { authAPI } from "@/apis/instance";
import type { PostStatus } from "@/types/community/community.types";
import { generatePath } from "@/utils/generatePath";

import { API_DOMAINS } from "@/constants/api/apiConstants";

export interface PostDetailResponse {
  id: number;
  title: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  commentCount: number;
  presignedUrls: string[];
  comments: Comment[];
  status: PostStatus;
  canDelete: boolean;
  blocked: boolean;
  blockMessage: string;
}

export const getCommunityDetail = async ({
  postId,
}: {
  postId: number;
}): Promise<PostDetailResponse> => {
  const response = await authAPI.get(
    generatePath(API_DOMAINS.GET_COMMUNITY_DETAIL, { postId }),
  );
  return response.data;
};
