export const path = {
  home: "/home",
  loading: "/loading",
  community: {
    base: "/community",
    feed: "/community/feed",
    write: "/write",
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
    analysis: "my/analysis",
  },
};
