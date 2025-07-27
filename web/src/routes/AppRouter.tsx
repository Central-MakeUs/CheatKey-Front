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
  MyPage,
  MyEditPage,
  MyPostsPage,
  MyAnalysisPage,
  TermsPage,
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
    path: path.loading,
    element: (
      <Layout>
        <AnalyzeLoadingPage />
      </Layout>
    ),
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
    element: (
      <Layout>
        <AnalyzePage />
      </Layout>
    ),
  },
  {
    element: <BottomLayout />,
    children: [
      {
        path: path.my.base,
        element: <MyPage />,
      },
    ],
  },
  {
    path: path.my.base,
    children: [
      {
        path: "edit",
        element: <MyEditPage />,
      },
      {
        path: "posts",
        element: <MyPostsPage />,
      },
      {
        path: "analysis",
        element: <MyAnalysisPage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
    ],
  },
]);

export default AppRouter;
