import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useFontSize } from "@/contexts/FontSizeContext";
import { getPlatform } from "@/utils/getPlatform";

import { TooltipBubble } from "@/components/common/TooltipBubble";

import { bridge } from "@/lib/bridge";
import { cn } from "@/lib/cn";

import Export from "@/assets/icons/export.svg?react";
import Prev from "@/assets/icons/prev.svg?react";
import Resize from "@/assets/icons/resize.svg?react";

const FONT_TOOLTIP_STORAGE_KEY = "hasSeenFontTooltip";

export const ContentDetailHeader = () => {
  const navigate = useNavigate();
  const { toggleFontSize } = useFontSize();

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;

    // TODO: @Ki-Tak 나중에 앱의 딥링크로 수정해야함
    try {
      const result = await bridge.shareUrl({
        url: currentUrl,
        message: `치트키의 사기 방지 콘텐츠를 지금 확인해보세요!\n\n`,
      });

      if (!result.success) {
        alert(result.message || "공유에 실패했습니다.");
      }
    } catch {
      alert("앱이 아닌 경우 공유 기능을 사용할 수 없습니다.");
    }
  };

  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem(FONT_TOOLTIP_STORAGE_KEY);

    if (hasSeenTooltip !== "true") {
      setIsTooltipVisible(true);

      const timer = setTimeout(() => {
        setIsTooltipVisible(false);
        localStorage.setItem(FONT_TOOLTIP_STORAGE_KEY, "true");
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <header
      className={cn(
        "h-header bg-bg-100 fixed z-10 flex w-full max-w-3xl items-center px-5",
        {
          "justify-between": getPlatform() !== "web",
          "justify-end": getPlatform() === "web",
        },
      )}
    >
      {getPlatform() !== "web" && (
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
          className="h-6 w-6"
        >
          <Prev className="text-base-0 h-full w-full" />
        </button>
      )}
      <div className="flex items-center gap-1" role="toolbar">
        <div className="relative h-8 w-8">
          <button
            type="button"
            aria-label="글씨 크기 조절"
            onClick={toggleFontSize}
            className="relative h-8 w-8"
          >
            <Resize className="h-full w-full" />
          </button>
          <div className="absolute top-full -right-0.5 mt-4">
            <TooltipBubble isOpen={isTooltipVisible} placement={"top-end"}>
              <p className="text-left whitespace-nowrap">
                글씨를 키워서
                <br /> 더 크게 볼 수 있어요
              </p>
            </TooltipBubble>
          </div>
        </div>
        {getPlatform() !== "web" && (
          <button
            type="button"
            aria-label="URL 공유하기"
            onClick={handleShare}
            className="h-8 w-8"
          >
            <Export className="text-gray-system-50 h-full w-full" />
          </button>
        )}
      </div>
    </header>
  );
};
