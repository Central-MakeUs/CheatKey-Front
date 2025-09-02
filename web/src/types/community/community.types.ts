export type CommunityPost = {
  id: number;
  authorNickname: string;
  createdAt: string;
  category?: string;
  title: string;
  content: string;
  commentCount: number;
  thumbnailUrls?: string[];
};

export type PostStatus = "ACTIVE" | "PENDING" | "DELETED";

export type CommentStatus = "ACTIVE" | "DELETED";

export type Comment = {
  id: number;
  postId: number;
  parentId: number | null;
  authorNickname: string;
  content: string;
  status: string;
  createdAt: string;
  canDelete: boolean;
  children: Comment[];
};

export interface UploadedImage {
  previewUrl: string;
  file: File;
}

export interface CommunityWriteFormState {
  title: string;
  board: string;
  content: string;
  images: UploadedImage[];
}
