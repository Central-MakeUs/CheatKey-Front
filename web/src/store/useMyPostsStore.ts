import { create } from "zustand";

import type { MyPostListResponse } from "@/types/my/my.types";

interface MyPostsStore {
  myPosts: MyPostListResponse | null;
  setMyPosts: (data: MyPostListResponse) => void;
  resetMyPosts: () => void;
}

export const useMyPostsStore = create<MyPostsStore>((set) => ({
  myPosts: null,
  setMyPosts: (data) => set({ myPosts: data }),
  resetMyPosts: () => set({ myPosts: null }),
}));
