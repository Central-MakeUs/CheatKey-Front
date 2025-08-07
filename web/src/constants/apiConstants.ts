export const API_DOMAINS = {
  AUTH_REGISTER: "/v1/api/auth/register",
  GET_CHECK_NICKNAME: "/v1/api/auth/register/nickname-check",
  POST_AUTH_LOGOUT: "/v1/api/auth/logout",
  DELETE_AUTH_WITHDRAW: "/v1/api/auth/withdraw",
  POST_ANALYZE_URL: "/v1/api/detection/url",
  POST_ANALYZE_CASE: "/v1/api/detection/case",
  GET_HOME_DASHBOARD: "/v1/api/home/dashboard",
  GET_MYPAGE_DASHBOARD: "/v1/api/mypage/dashboard",
  GET_MYPAGE_COMMUNITY_POSTS_MANAGEMENT:
    "/v1/api/mypage/community/posts/management",
  GET_MYPAGE_DETECTION_HISTORY: "/v1/api/mypage/detection/history",
  GET_COMMUNITY_POSTS: "v1/api/community/posts",
  POST_COMMUNITY_POSTS: "v1/api/community/posts",
};

export const QUERY_KEYS = {
  GET_AUTH_REGISTER: "register",
  HOME_DASHBOARD: "homeDashboard",
};
