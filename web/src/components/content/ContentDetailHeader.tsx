import { useNavigate } from "react-router-dom";

import Export from "@/assets/icons/export.svg?react";
import Prev from "@/assets/icons/prev.svg?react";
import Resize from "@/assets/icons/resize.svg?react";

export const ContentDetailHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="h-header bg-bg-100 fixed flex w-full max-w-lg items-center justify-between px-5">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="h-6 w-6"
      >
        <Prev className="text-base-0 h-6 w-6" />
      </button>
      <div className="flex items-center gap-1">
        <button type="button" aria-label="글씨 크기 조절" className="h-8 w-8">
          <Resize className="h-8 w-8" />
        </button>
        <button
          type="button"
          aria-label="URL 복사"
          onClick={() => {
            console.log("URL 복사");
          }}
          className="h-8 w-8"
        >
          <Export className="text-gray-system-50 h-8 w-8" />
        </button>
      </div>
    </header>
  );
};
