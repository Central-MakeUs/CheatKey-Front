import { useState } from "react";

type MenuType =
  | "closed"
  | "menu"
  | "block"
  | "report"
  | "reportComplete"
  | "deletePost"
  | "deleteComment";

interface UsePostMenuOptions {
  onReportComplete?: () => void;
}

export const usePostMenu = (options?: UsePostMenuOptions) => {
  const [menuState, setMenuState] = useState<{
    type: MenuType;
    id: number | null;
  }>({ type: "closed", id: null });

  const openMenu = (id: number) => setMenuState({ type: "menu", id });
  const openBlockConfirm = (id: number) => setMenuState({ type: "block", id });
  const openReportSheet = (id: number) => setMenuState({ type: "report", id });
  const openPostDeleteConfirm = (id: number) =>
    setMenuState({
      type: "deletePost",
      id,
    });
  const openCommentDeleteConfirm = (id: number) =>
    setMenuState({
      type: "deleteComment",
      id,
    });
  const showReportComplete = () => {
    setMenuState({ type: "reportComplete", id: null });
    options?.onReportComplete?.();
  };
  const close = () => setMenuState({ type: "closed", id: null });

  return {
    menuState,
    openMenu,
    openBlockConfirm,
    openReportSheet,
    openPostDeleteConfirm,
    openCommentDeleteConfirm,
    showReportComplete,

    close,
  };
};
