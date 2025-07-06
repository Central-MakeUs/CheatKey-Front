// 키보드 높이 구하는 커스텀 훅입니다.
// 나중에 입력창이 있는데 확인 버튼이 있는 경우 사용하시면 됩니당
import { useState, useEffect } from "react";

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const visualViewport = window.visualViewport;
    if (!visualViewport) return;

    const handleResize = () => {
      // 전체 윈도우 높이에서 실제 보이는 영역의 높이를 빼서 키보드 높이를 계산
      const newKeyboardHeight = window.innerHeight - visualViewport.height;
      setKeyboardHeight(newKeyboardHeight > 0 ? newKeyboardHeight : 0);
    };

    visualViewport.addEventListener("resize", handleResize);

    return () => {
      visualViewport.removeEventListener("resize", handleResize);
    };
  }, []);

  return keyboardHeight;
};
