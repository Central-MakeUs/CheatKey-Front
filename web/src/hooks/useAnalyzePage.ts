import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { path } from "@/routes/path";

import { postAnalyzeCase } from "@/apis/analyze/postAnalyzeCase";
import { postAnalyzeURL } from "@/apis/analyze/postAnalyzeURL";
import type { AnalyzeResponse } from "@/types/analyzeResult/analyzeResult.types";

import type { TabCategory } from "@/components/analyze/TabSwitcher";

import { analysisTabsData } from "@/constants/analyze/page/analyzePageConstants";

interface AnalyzeVariables {
  activeTab: TabCategory;
  inputValue: string;
}

export const useAnalyzePage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabCategory>("url");
  const [inputValue, setInputValue] = useState<string>("");

  const {
    mutate: analyze,
    isPending: isAnalyzePending,
    isSuccess: isAnalyzeSuccess,
  } = useMutation<AnalyzeResponse, AxiosError, AnalyzeVariables>({
    mutationFn: ({ activeTab, inputValue }) => {
      if (activeTab === "url") {
        return postAnalyzeURL({ detectionUrl: inputValue });
      }
      return postAnalyzeCase({ text: inputValue });
    },
    onSuccess: (data) => {
      const resultId = data.detectionId;
      navigate(path.analyze.specific.result(resultId), { state: data });
    },
    onError: (error) => {
      console.error("분석 실패:", error);
    },
  });

  const currentTabInfo = analysisTabsData.find((tab) => tab.id === activeTab)!;
  const controlledPanelId = "analysis-panel";
  const isButtonEnabled = inputValue !== "" && !isAnalyzePending;

  const handleNavigateBack = () => navigate(-1);

  const handleTabChange = (tab: TabCategory) => {
    setActiveTab(tab);
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isButtonEnabled) return;
    analyze({ activeTab, inputValue });
  };

  return {
    activeTab,
    inputValue,
    setInputValue,
    currentTabInfo,
    controlledPanelId,
    isAnalyzePending,
    isAnalyzeSuccess,
    isButtonEnabled,
    handleNavigateBack,
    handleTabChange,
    handleSubmit,
  };
};
