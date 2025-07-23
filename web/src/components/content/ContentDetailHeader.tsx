import { useNavigate } from "react-router-dom";

import { useFontSize } from "@/hooks/useFontSize";

import Export from "@/assets/icons/export.svg?react";
import Prev from "@/assets/icons/prev.svg?react";
import Resize from "@/assets/icons/resize.svg?react";

export const ContentDetailHeader = () => {
  const navigate = useNavigate();
  const { toggleFontSize } = useFontSize();

  return (
    <header className="h-header bg-bg-100 fixed flex w-full max-w-lg items-center justify-between px-5">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="h-6 w-6"
      >
        <Prev className="text-base-0 h-full w-full" />
      </button>
      <div className="flex items-center gap-1" role="toolbar">
        <button
          type="button"
          aria-label="글씨 크기 조절"
          onClick={toggleFontSize}
          className="h-8 w-8"
        >
          <Resize className="h-full w-full" />
        </button>
        <button
          type="button"
          aria-label="URL 복사"
          onClick={() => {
            console.log("URL 복사");
          }}
          className="h-8 w-8"
        >
          <Export className="text-gray-system-50 h-full w-full" />
        </button>
      </div>
    </header>
  );
};
