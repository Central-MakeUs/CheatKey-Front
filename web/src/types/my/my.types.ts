//유저 정보
export interface MyInfo {
  nickname: string;
  totalVisitCount: number;
  level: number;
  profileImageId: number;
  profileImageUrl: string;
  profileImageName: string;
}

export interface ProfileImage {
  id: number;
  imageUrl: string;
  imageName: string;
}

export interface MypageDashboardResponse {
  userInfo: MyInfo;
  profileImages: ProfileImage[];
}

//내 작성글 아이템
export interface MyPostItem {
  id: number;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  imageUrls: string[];
}

// 내 작성글 리스트
export interface MyPostListResponse {
  currentPage: number;
  pageSize: number;
  posts: MyPostItem[];
  totalPosts: number;
}

//사기 분석 내역
export interface MyAnalysisItem {
  id: number;
  status: "SAFE" | "WARNING" | "DANGER";
  detectionType: "URL" | "TEXT";
  inputText: string;
  detectedAt: string;
  topScore: number;
  matchedCaseId: string;
}

export interface MyAnalysisHistoryResponse {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: MyAnalysisItem[];
}
