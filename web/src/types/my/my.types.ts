export type AnalysisLevel = "양호" | "주의" | "위험";

export type AnalysisType = "URL 분석" | "텍스트 분석";

export interface MyAnalysisItem {
  id: string;
  level: AnalysisLevel;
  analysisType: AnalysisType;
  content: string;
  detectedAt: string;
}
