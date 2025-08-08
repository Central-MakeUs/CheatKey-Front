import { useState } from "react";

type MenuType = "closed" | "menu" | "block" | "report" | "reportComplete";

export const usePostMenu = () => {
  const [menuState, setMenuState] = useState<{
    type: MenuType;
    postId: number | null;
  }>({ type: "closed", postId: null });

  const openMenu = (postId: number) => setMenuState({ type: "menu", postId });
  const openBlockConfirm = (postId: number) =>
    setMenuState({ type: "block", postId });
  const openReportSheet = (postId: number) =>
    setMenuState({ type: "report", postId });
  const showReportComplete = () =>
    setMenuState({ type: "reportComplete", postId: null });
  const close = () => setMenuState({ type: "closed", postId: null });

  return {
    menuState,
    openMenu,
    openBlockConfirm,
    openReportSheet,
    showReportComplete,
    close,
  };
};
