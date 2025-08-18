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
import type { ToastIconType } from "@/components/common/Toast";

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
  const [toastInfo, setToastInfo] = useState<{
    message: string;
    icon: ToastIconType;
  } | null>(null);
  const [hasShownUrlToast, setHasShownUrlToast] = useState<boolean>(false);

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

  const showToast = (message: string, icon: ToastIconType = "warning") => {
    setToastInfo({ message, icon });
    setTimeout(() => setToastInfo(null), 3500);
  };

  const currentTabInfo = analysisTabsData.find((tab) => tab.id === activeTab)!;
  const controlledPanelId = "analysis-panel";
  const isButtonEnabled =
    inputValue !== "" && !isAnalyzePending && toastInfo === null;

  const handleNavigateBack = () => navigate(-1);

  const handleNavigateCommunity = () => navigate(path.community.feed);

  const handleTabChange = (tab: TabCategory) => {
    if (!hasShownUrlToast && tab === "url") {
      showToast(
        `URL 자체 기준으로, 피싱이 포함된 내용은 사례 검색 및 확인이 필요할 수 있어요.`,
        "alert",
      );
      setHasShownUrlToast(true);
    }

    setActiveTab(tab);
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToastInfo(null);
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
    handleNavigateCommunity,
    handleTabChange,
    handleSubmit,
    toastInfo,
  };
};
