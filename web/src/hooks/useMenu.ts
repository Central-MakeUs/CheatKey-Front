import { useState } from "react";

export type MenuType =
  | "closed"
  | "postMenu"
  | "commentMenu"
  | "blockPost"
  | "blockComment"
  | "reportPost"
  | "reportComment"
  | "reportComplete"
  | "deletePost"
  | "deleteComment";

export const useMenu = () => {
  const [menuState, setMenuState] = useState<{
    type: MenuType;
    id: number | null;
  }>({ type: "closed", id: null });

  const openPostMenu = (id: number) => setMenuState({ type: "postMenu", id });

  const openCommentMenu = (id: number) =>
    setMenuState({ type: "commentMenu", id });

  const openBlockPostConfirm = (id: number) =>
    setMenuState({ type: "blockPost", id });

  const openBlockCommentConfirm = (id: number) =>
    setMenuState({ type: "blockComment", id });

  const openReportPostSheet = (id: number) =>
    setMenuState({ type: "reportPost", id });

  const openReportCommentSheet = (id: number) =>
    setMenuState({ type: "reportComment", id });

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
  };

  const close = () => setMenuState({ type: "closed", id: null });

  return {
    menuState,
    openPostMenu,
    openCommentMenu,
    openBlockPostConfirm,
    openBlockCommentConfirm,
    openReportPostSheet,
    openReportCommentSheet,
    openPostDeleteConfirm,
    openCommentDeleteConfirm,
    showReportComplete,
    close,
  };
};
