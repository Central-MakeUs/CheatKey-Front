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
  AnalyzeUnknownPage,
} from "@/pages";

import { BottomLayout } from "@/layout/BottomLayout";

import { Layout } from "@/components/layout/Layout";

import { PAGE_PATH } from "@/constants/path";

const AppRouter = createBrowserRouter([
  {
    path: PAGE_PATH.ONBOARDING,
    element: <OnboardingPage />,
  },
  {
    element: <BottomLayout />,
    children: [
      {
        path: PAGE_PATH.HOME,
        element: <Home />,
      },
      {
        path: PAGE_PATH.COMMUNITY.SPECIFIC.FEED,
        element: <CommunityFeed />,
      },
    ],
  },
  {
    path: PAGE_PATH.CONTENT.BASE,
    element: <BottomLayout />,
    children: [
      {
        index: true,
        element: <ContentListPage />,
      },
      {
        path: PAGE_PATH.CONTENT.SPECIFIC.ARTICLE,
        element: <ArticleDetailPage />,
      },
      {
        path: PAGE_PATH.CONTENT.SPECIFIC.INTERVIEW,
        element: <InterviewDetailPage />,
      },
    ],
  },
  {
    path: PAGE_PATH.COMMUNITY.SPECIFIC.DETAIL,
    element: <CommunityDetail />,
  },
  {
    path: PAGE_PATH.COMMUNITY.SPECIFIC.WRITE,
    element: <CommunityWrite />,
  },
  {
    path: PAGE_PATH.SEARCH.BASE,
    element: (
      <Layout>
        <SearchPage />
      </Layout>
    ),
  },
  {
    path: PAGE_PATH.AUTH.LOGIN,
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: PAGE_PATH.AUTH.SIGNUP,
    element: (
      <Layout>
        <SignUpPage />
      </Layout>
    ),
  },
  {
    path: PAGE_PATH.ANALYZE.BASE,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <AnalyzePage />,
      },
      {
        path: PAGE_PATH.ANALYZE.SPECIFIC.RESULT,
        element: <AnalyzeResultPage />,
      },
      {
        path: PAGE_PATH.ANALYZE.SPECIFIC.UNKNOWN,
        element: <AnalyzeUnknownPage />,
      },
    ],
  },
  {
    element: <BottomLayout />,
    children: [
      {
        path: PAGE_PATH.MY.BASE,
        element: <MyPage />,
      },
    ],
  },
  {
    path: PAGE_PATH.MY.SPECIFIC.EDIT,
    element: <MyEditPage />,
  },
  {
    path: PAGE_PATH.MY.SPECIFIC.POSTS,
    element: <MyPostsPage />,
  },
  {
    path: PAGE_PATH.MY.SPECIFIC.ANALYSIS,
    element: <MyAnalysisPage />,
  },
  {
    path: PAGE_PATH.MY.SPECIFIC.TERMS,
    element: <TermsPage />,
  },
]);

export default AppRouter;
