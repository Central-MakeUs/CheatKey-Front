export const path = {
  onboarding: "",
  home: "/home",
  community: {
    base: "/community",
    feed: "/community/feed",
    write: "/write",
    detail: (postId: string) => `/community/${postId}`,
  },
  auth: {
    login: "/login",
    signup: "/signup",
  },
  search: {
    base: "/search",
  },
  analyze: {
    base: "/analyze",
    specific: {
      result: (analyzeId: string | number) => `result/${analyzeId}`,
      unknown: "result/unknown",
    },
  },
  content: {
    base: "/content",
    specific: {
      article: (articleId: string | number) => `article/${articleId}`,
      interview: (interviewId: string | number) => `interview/${interviewId}`,
    },
  },
  my: {
    base: "/my",
    edit: "/my/edit",
    posts: "/my/posts",
    analysis: "/my/analysis",
    terms: "/my/terms",
  },
};
