export const API_DOMAINS = {
  AUTH_REGISTER: "/v1/api/auth/register",
  GET_CHECK_NICKNAME: "/v1/api/auth/register/nickname-check",
  POST_AUTH_LOGOUT: "/v1/api/auth/logout",
  DELETE_AUTH_WITHDRAW: "/v1/api/auth/withdraw",
  POST_ANALYZE_URL: "/v1/api/detection/url",
  POST_ANALYZE_CASE: "/v1/api/detection/case",
  GET_ANALYZE_RESULT: "/v1/api/detection/history/:detectionId",
  GET_HOME_DASHBOARD: "/v1/api/home/dashboard",
  GET_MYPAGE_DASHBOARD: "/v1/api/mypage/dashboard",
  GET_MYPAGE_COMMUNITY_POSTS_MANAGEMENT:
    "/v1/api/mypage/community/posts/management",
  GET_MYPAGE_DETECTION_HISTORY: "/v1/api/mypage/detection/history",
  GET_COMMUNITY_POSTS: "/v1/api/community/posts",
  POST_COMMUNITY_POSTS: "/v1/api/community/posts",
  POST_FILES_UPLOAD: "/v1/api/files/upload",
  DELETE_COMMUNITY_POST: "/v1/api/community/posts/:postId",
  POST_REPORT: "/v1/api/community/posts/:postId/report",
  POST_BLOCK: "/v1/api/community/posts/:postId/author/block",
};

export const QUERY_KEYS = {
  GET_AUTH_REGISTER: "register",
  HOME_DASHBOARD: "homeDashboard",
  MYPAGE_DASHBOARD: "myPageDashboard",
  MYPAGE_POST: "myPagePosts",
  GET_DETECTION_RESULT: "myDetectionResult",
  GET_COMMUNITY_FEED: "communityPosts",
};
