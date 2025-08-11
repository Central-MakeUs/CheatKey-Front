import { useNavigate } from "react-router-dom";

import { bridge } from "@/bridge";
import { useFontSize } from "@/hooks/useFontSize";

import Export from "@/assets/icons/export.svg?react";
import Prev from "@/assets/icons/prev.svg?react";
import Resize from "@/assets/icons/resize.svg?react";

export const ContentDetailHeader = () => {
  const navigate = useNavigate();
  const { toggleFontSize } = useFontSize();

  const handleShare = async () => {
    const currentUrl = window.location.href;

    // TODO: @Ki-Tak 나중에 앱의 딥링크로 수정해야함
    try {
      const result = await bridge.shareUrl({
        url: currentUrl,
        message: "치트키의 콘텐츠를 확인해보세요!",
      });

      if (!result.success) {
        alert(result.message || "공유에 실패했습니다.");
      }
    } catch {
      alert("공유 기능을 사용할 수 없습니다.");
    }
  };

  return (
    <header className="h-header bg-bg-100 fixed flex w-full max-w-3xl items-center justify-between px-5">
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
          aria-label="URL 공유하기"
          onClick={handleShare}
          className="h-8 w-8"
        >
          <Export className="text-gray-system-50 h-full w-full" />
        </button>
      </div>
    </header>
  );
};
