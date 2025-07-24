import { createBrowserRouter } from "react-router-dom";

import {
  Home,
  CommunityDetail,
  CommunityFeed,
  CommunityWrite,
  LoginPage,
  SignUpPage,
  SearchPage,
  AnalyzeLoadingPage,
  AnalyzePage,
  ContentListPage,
  ArticleDetailPage,
  InterviewDetailPage,
  AnalyzeResultPage,
} from "@/pages";

import { BottomLayout } from "@/layout/BottomLayout";

import { Layout } from "@/components/layout/Layout";

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
    path: path.content.base,
    element: <BottomLayout />,
    children: [
      {
        path: "",
        element: <ContentListPage />,
      },
      {
        path: path.content.specific.article(":articleId"),
        element: <ArticleDetailPage />,
      },
      {
        path: path.content.specific.interview(":interviewId"),
        element: <InterviewDetailPage />,
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
    path: path.search.base,
    element: (
      <Layout>
        <SearchPage />
      </Layout>
    ),
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
  {
    path: path.analyze.base,
    element: <Layout />,
    children: [
      {
        path: "",
        element: <AnalyzePage />,
      },
      {
        path: path.analyze.specific.loading,
        element: <AnalyzeLoadingPage />,
      },
      {
        path: path.analyze.specific.result(":analyzeId"),
        element: <AnalyzeResultPage />,
      },
    ],
  },
]);

export default AppRouter;
