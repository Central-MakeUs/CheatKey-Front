import { createBrowserRouter } from "react-router-dom";

import { path } from "./path";

import { Home, CommunityDetail, CommunityFeed, CommunityWrite, LoginPage, SignUpPage} from "@/pages";

import BottomLayout from "@/layout/BottomLayout";
import { Layout } from "@/components/layout/Layout";

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
  {
    path: path.auth.login,
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: path.auth.signup,
    element: (
      <Layout>
        <SignUpPage />
      </Layout>
    ),
  },
]);

export default AppRouter;
