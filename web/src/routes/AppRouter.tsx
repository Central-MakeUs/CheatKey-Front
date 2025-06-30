import { createBrowserRouter } from "react-router-dom";
import { path } from "./path";
import { Home } from "@/pages";
import CommunityDetail from "@/pages/communityDetail/CommunityDetail";
import CommunityFeed from "@/pages/communityFeed/CommunityFeed";
import CommunityWrite from "@/pages/communityWrite/CommunityWrite";
import BottomLayout from "@/layouts/BottomLayout";

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
