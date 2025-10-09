import { createBrowserRouter } from "react-router-dom";

import { BottomLayout } from "@/layouts/BottomLayout";
import { RootLayout } from "@/layouts/RootLayout";
import * as Pages from "@/pages";

import { PAGE_PATH } from "@/constants/path";

const AppRouter = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [
      {
        Component: BottomLayout,
        children: [
          {
            path: PAGE_PATH.HOME,
            Component: Pages.Home,
          },
          {
            path: PAGE_PATH.COMMUNITY.SPECIFIC.FEED,
            Component: Pages.CommunityFeed,
          },
          {
            path: PAGE_PATH.CONTENT.BASE,
            Component: Pages.ContentListPage,
          },
          {
            path: PAGE_PATH.MY.BASE,
            Component: Pages.MyPage,
          },
        ],
      },
      {
        path: PAGE_PATH.ONBOARDING,
        Component: Pages.OnboardingPage,
      },
      {
        path: PAGE_PATH.CONTENT.SPECIFIC.ARTICLE,
        Component: Pages.ArticleDetailPage,
      },
      {
        path: PAGE_PATH.CONTENT.SPECIFIC.INTERVIEW,
        Component: Pages.InterviewDetailPage,
      },
      {
        path: PAGE_PATH.COMMUNITY.SPECIFIC.DETAIL,
        Component: Pages.CommunityDetail,
      },
      {
        path: PAGE_PATH.COMMUNITY.SPECIFIC.WRITE,
        Component: Pages.CommunityWrite,
      },
      {
        path: PAGE_PATH.SEARCH.BASE,
        Component: Pages.SearchPage,
      },
      {
        path: PAGE_PATH.AUTH.LOGIN,
        Component: Pages.LoginPage,
      },
      {
        path: PAGE_PATH.AUTH.SIGNUP,
        Component: Pages.SignUpPage,
      },
      {
        path: PAGE_PATH.ANALYZE.BASE,
        Component: Pages.AnalyzePage,
      },
      {
        path: PAGE_PATH.ANALYZE.SPECIFIC.RESULT,
        Component: Pages.AnalyzeResultPage,
      },
      {
        path: PAGE_PATH.ANALYZE.SPECIFIC.UNKNOWN,
        Component: Pages.AnalyzeUnknownPage,
      },
      {
        path: PAGE_PATH.ANALYZE.SPECIFIC.GUIDE,
        Component: Pages.AnalyzeGuidePage,
      },
      {
        path: PAGE_PATH.MY.SPECIFIC.EDIT,
        Component: Pages.MyEditPage,
      },
      {
        path: PAGE_PATH.MY.SPECIFIC.POSTS,
        Component: Pages.MyPostsPage,
      },
      {
        path: PAGE_PATH.MY.SPECIFIC.ANALYSIS,
        Component: Pages.MyAnalysisPage,
      },
      {
        path: PAGE_PATH.MY.SPECIFIC.TERMS,
        Component: Pages.TermsPage,
      },
    ],
  },
]);

export default AppRouter;
