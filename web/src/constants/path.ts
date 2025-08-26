export const PAGE_PATH = {
  ONBOARDING: "/",
  HOME: "/home",
  COMMUNITY: {
    BASE: "/community",
    SPECIFIC: {
      FEED: "/community/feed",
      WRITE: "/community/write",
      DETAIL: "/community/:postId",
    },
  },
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },
  SEARCH: {
    BASE: "/search",
  },
  ANALYZE: {
    BASE: "/analyze",
    SPECIFIC: {
      RESULT: "/analyze/result/:analyzeId",
      UNKNOWN: "/analyze/result/unknown",
    },
  },
  CONTENT: {
    BASE: "/content",
    SPECIFIC: {
      ARTICLE: "/content/article/:articleId",
      INTERVIEW: "/content/interview/:interviewId",
    },
  },
  MY: {
    BASE: "/my",
    SPECIFIC: {
      EDIT: "/my/edit",
      POSTS: "/my/posts",
      ANALYSIS: "/my/analysis",
      TERMS: "/my/terms",
    },
  },
} as const;
