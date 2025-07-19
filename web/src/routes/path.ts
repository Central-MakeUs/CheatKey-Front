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
  },
};
