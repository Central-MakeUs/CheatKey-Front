import { create } from "zustand";

import type {
  MypageDashboardResponse,
  MyInfo,
  ProfileImage,
} from "@/types/my/my.types";

interface MyPageStore {
  myInfo: MyInfo | null;
  profileImages: ProfileImage[];
  setMyDashboardData: (data: MypageDashboardResponse) => void;
  resetMyDashboardData: () => void;
}

export const useMyPageStore = create<MyPageStore>((set) => ({
  myInfo: null,
  profileImages: [],
  setMyDashboardData: (data) =>
    set({
      myInfo: data.myInfo,
      profileImages: data.profileImages,
    }),
  resetMyDashboardData: () =>
    set({
      myInfo: null,
      profileImages: [],
    }),
}));
