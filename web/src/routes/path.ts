export const path = {
  home: "/home",
  community: {
    base: "/community",
    feed: "/community/feed",
    write: "/community/write",
    //TODO: @tifsy 커뮤니티 글 상세보기 path 변경 가능
    detail: (id: string) => `/community/${id}`,
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
      loading: "loading",
      result: (analyzeId: string | number) => `result/${analyzeId}`,
    },
  },
  content: {
    base: "/content",
    specific: {
      article: (articleId: string | number) => `article/${articleId}`,
      interview: (interviewId: string | number) => `interview/${interviewId}`,
    },
  },
};
