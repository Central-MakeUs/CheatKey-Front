import {
  ANALYSIS_STATUS,
  ANALYSIS_CATEGORY,
} from "@/constants/analyze/analyzeResultConstants";

export type AnalysisCategory =
  (typeof ANALYSIS_CATEGORY)[keyof typeof ANALYSIS_CATEGORY];

export interface ResultCardStyle {
  background: string;
  statusBackground: string;
  cardBackground: string;
  cardInnerBackground: string;
  borderColor: string;
  primaryColor: string;
  indicatorColor: string;
}

export interface AnalysisFirstFooterItem {
  label: string;
  value: string;
}

interface AnalysisDetailCardData {
  question: string;
  answer: string;
  image: string;
  explain: string;
  footer: string;
}

interface AnalysisFirstCardData {
  image: string;
  explain: string;
  footer: {
    header: string;
    items: AnalysisFirstFooterItem[];
  };
}

export interface CategoryResultDetails {
  first: AnalysisFirstCardData;
  detailCards: AnalysisDetailCardData[];
}

type AnalysisResultUnion<DetailsType> =
  | {
      status: typeof ANALYSIS_STATUS.SAFE;
      title: string;
      style: ResultCardStyle;
      details: DetailsType;
    }
  | {
      status: typeof ANALYSIS_STATUS.WARNING;
      title: string;
      style: ResultCardStyle;
      details: DetailsType;
    }
  | {
      status: typeof ANALYSIS_STATUS.DANGER;
      title: string;
      style: ResultCardStyle;
      details: DetailsType;
    };
export type CategoryAnalysisResult = AnalysisResultUnion<CategoryResultDetails>;

export type AnalysisReport = Record<AnalysisCategory, CategoryAnalysisResult>;
