import { createBrowserRouter, Outlet } from "react-router-dom";

import {
  Home,
  CommunityDetail,
  CommunityFeed,
  CommunityWrite,
  LoginPage,
  SignUpPage,
  SearchPage,
  AnalyzePage,
  ContentListPage,
  ArticleDetailPage,
  InterviewDetailPage,
  AnalyzeResultPage,
  MyPage,
  MyEditPage,
  MyPostsPage,
  MyAnalysisPage,
  TermsPage,
  OnboardingPage,
} from "@/pages";

import { BottomLayout } from "@/layout/BottomLayout";

import { Layout } from "@/components/layout/Layout";

import { path } from "./path";

const AppRouter = createBrowserRouter([
  {
    path: path.onboarding,
    element: <OnboardingPage />,
  },
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
    path: path.community.detail(":postId"),
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
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "",
        element: <AnalyzePage />,
      },
      {
        path: path.analyze.specific.result(":analyzeId"),
        element: <AnalyzeResultPage />,
      },
    ],
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
        path: path.my.edit,
        element: <MyEditPage />,
      },
      {
        path: path.my.posts,
        element: <MyPostsPage />,
      },
      {
        path: path.my.analysis,
        element: <MyAnalysisPage />,
      },
      {
        path: path.my.terms,
        element: <TermsPage />,
      },
    ],
  },
]);

export default AppRouter;
