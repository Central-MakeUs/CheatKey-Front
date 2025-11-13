import { lazy } from "react";

export const Home = lazy(() =>
  import("./home/Home").then((module) => ({ default: module.Home })),
);
export const CommunityDetail = lazy(() =>
  import("./communityDetail/CommunityDetail").then((module) => ({
    default: module.CommunityDetail,
  })),
);
export const CommunityFeed = lazy(() =>
  import("./communityFeed/CommunityFeed").then((module) => ({
    default: module.CommunityFeed,
  })),
);
export const CommunityWrite = lazy(() =>
  import("./communityWrite/CommunityWrite").then((module) => ({
    default: module.CommunityWrite,
  })),
);
export const LoginPage = lazy(() =>
  import("./auth/LoginPage").then((module) => ({ default: module.LoginPage })),
);
export const SignUpPage = lazy(() =>
  import("./auth/SignUpPage").then((module) => ({
    default: module.SignUpPage,
  })),
);
export const SearchPage = lazy(() =>
  import("./searchPage/SearchPage").then((module) => ({
    default: module.SearchPage,
  })),
);
export const AnalyzePage = lazy(() =>
  import("./analyze/AnalyzePage").then((module) => ({
    default: module.AnalyzePage,
  })),
);
export const AnalyzeResultPage = lazy(() =>
  import("./analyze/AnalyzeResultPage").then((module) => ({
    default: module.AnalyzeResultPage,
  })),
);
export const AnalyzeUnknownPage = lazy(() =>
  import("./analyze/AnalyzeUnknownPage").then((module) => ({
    default: module.AnalyzeUnknownPage,
  })),
);
export const AnalyzeGuidePage = lazy(() =>
  import("./analyze/AnalyzeGuidePage").then((module) => ({
    default: module.AnalyzeGuidePage,
  })),
);
export const ContentListPage = lazy(() =>
  import("./content/ContentListPage").then((module) => ({
    default: module.ContentListPage,
  })),
);
export const ArticleDetailPage = lazy(() =>
  import("./content/ArticleDetailPage").then((module) => ({
    default: module.ArticleDetailPage,
  })),
);
export const InterviewDetailPage = lazy(() =>
  import("./content/InterviewDetailPage").then((module) => ({
    default: module.InterviewDetailPage,
  })),
);
export const MyPage = lazy(() =>
  import("./my/MyPage").then((module) => ({ default: module.MyPage })),
);
export const MyPostsPage = lazy(() =>
  import("./my/MyPostsPage").then((module) => ({
    default: module.MyPostsPage,
  })),
);
export const MyAnalysisPage = lazy(() =>
  import("./my/MyAnalysisPage").then((module) => ({
    default: module.MyAnalysisPage,
  })),
);
export const TermsPage = lazy(() =>
  import("./my/TermsPage").then((module) => ({ default: module.TermsPage })),
);
export const OnboardingPage = lazy(() =>
  import("./onboarding/OnboardingPage").then((module) => ({
    default: module.OnboardingPage,
  })),
);
