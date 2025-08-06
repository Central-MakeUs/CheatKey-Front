export type HomeBannerData = {
  image: string;
  title: string;
  content: string;
  bannerId: number;
  navigate: string;
};
export type HomeTrendingPostData = {
  id: number;
  title: string;
  content: string;
  authorProfileImageUrl: string;
  authorNickname: string;
};
export interface HomeUserInfo {
  profileImageUrl: string;
  level: number;
  nickname: string;
  totalVisitCount: number;
}
export interface HomeDashboardResponse {
  userInfo: HomeUserInfo;
  popularPosts: HomeTrendingPostData[];
}
