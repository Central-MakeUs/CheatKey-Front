import { createBrowserRouter } from "react-router-dom";

import { Home, CommunityDetail, CommunityFeed, CommunityWrite } from "@/pages";

import BottomLayout from "@/layout/BottomLayout";

import { path } from "./path";

const AppRouter = createBrowserRouter([
  {
    element: <BottomLayout />,
    children: [
      {
        path: path.home,
        element: <Home />,
      },
      {
        path: path.community.feed,
        element: <CommunityFeed />,
      },
    ],
  },

  {
    //TODO: @tifsy 커뮤니티 글 상세보기 path 변경
    path: path.community.detail(":id"),
    element: <CommunityDetail />,
  },
  {
    path: path.community.write,
    element: <CommunityWrite />,
  },
]);

export default AppRouter;
