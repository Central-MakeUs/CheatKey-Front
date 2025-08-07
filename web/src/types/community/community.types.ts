export type CommunityPost = {
  id: number;
  nickname: string;
  date: string;
  category?: string;
  title: string;
  content: string;
  commentCount: number;
  images?: string[];
};

export type Comment = {
  id: number;
  postId: number;
  parentId: number | null;
  userId: number;
  userNickname: string;
  content: string;
  status: string;
  createdAt: string;
  children: Comment[];
};

export interface UploadedImage {
  previewUrl: string;
  file: File;
}

//커뮤니티 글 작성 유효성
export type CommunityWriteValidationError = {
  titleTooShort: boolean;
  contentTooShort: boolean;
  boardEmpty: boolean;
  imageTooLarge: boolean;
};
