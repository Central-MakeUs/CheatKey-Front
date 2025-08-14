import { authAPI } from "@/apis/instance";

import { API_DOMAINS } from "@/constants/apiConstants";

export interface CommentPostRequest {
  postId: number;
  parentId?: number;
  content: string;
}

export const postComment = async ({
  postId,
  parentId,
  content,
}: CommentPostRequest) => {
  const requestBody: CommentPostRequest = {
    postId,
    content,
    ...(parentId && { parentId }),
  };
  const response = await authAPI.post(API_DOMAINS.POST_COMMENT, requestBody);

  return response.data;
};
