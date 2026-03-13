import { authAPI } from "@/apis/instance";

import { API_DOMAINS } from "@/constants/api/apiConstants";

//커뮤니티 글 작성 이미지 업로드 api 응답

export interface UploadObject {
  fileUploadId: number;
  originalName: string;
  s3Key: string;
  size: number;
  contentType: string;
  isTemp: boolean;
  createdAt: string;
}

export type UploadResponse = UploadObject[];

//커뮤니티 글 작성 api 요청
export interface CommunityPostRequest {
  title: string;
  content: string;
  category: string;
  fileUploadIds: number[];
}

//커뮤니티 글 작성 api 응답
export type CommunityPostResponse = number;

export const postFilesUpload = async (
  files: File[],
): Promise<UploadResponse> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await authAPI.post(API_DOMAINS.POST_FILES_UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const postCommunityPosts = async (
  postData: CommunityPostRequest,
): Promise<CommunityPostResponse> => {
  const response = await authAPI.post(
    API_DOMAINS.POST_COMMUNITY_POSTS,
    postData,
  );
  return response.data;
};
