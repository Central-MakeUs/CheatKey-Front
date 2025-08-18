import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { z } from "zod";

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

const URL_ERROR_MSG = "잘못된 URL 형식이에요.";
const CASE_ERROR_MSG = "분석할 수 없는 유형이에요.";

export const useAnalyzePage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabCategory>("case");
  const [inputValue, setInputValue] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>("");

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
      if (data.status === "UNKNOWN") {
        navigate(path.analyze.specific.unknown);
      } else {
        const resultId = data.detectionId;
        navigate(path.analyze.specific.result(resultId), { state: data });
      }
    },
    onError: () => {
      if (activeTab === "url") {
        showToast(URL_ERROR_MSG);
      } else {
        showToast(CASE_ERROR_MSG);
      }
    },
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

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
    setToastMessage(null);
    if (!isButtonEnabled) return;

    if (activeTab === "url") {
      const urlSchema = z.url(URL_ERROR_MSG);
      const validationResult = urlSchema.safeParse(inputValue);
      if (!validationResult.success) {
        showToast(validationResult.error.issues[0].message);
        return;
      }
    }
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
    toastMessage,
  };
};
