import { authAPI } from "@/apis/instance";
import type { MyPostListResponse } from "@/types/my/my.types";

import { API_DOMAINS } from "@/constants/apiConstants";

export const getMypageCommunityPostsManagement =
  async (): Promise<MyPostListResponse> => {
    const response = await authAPI.get(
      API_DOMAINS.GET_MYPAGE_COMMUNITY_POSTS_MANAGEMENT,
    );
    return response.data;
  };
