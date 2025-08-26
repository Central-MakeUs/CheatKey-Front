import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

export type TabCategory = "url" | "case";

interface TabSwitcherProps {
  activeTab: TabCategory;
  onTabChange: (tab: TabCategory) => void;
  ariaControls: string;
}

export const TabSwitcher = ({
  activeTab,
  onTabChange,
  ariaControls,
}: TabSwitcherProps) => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicator = indicatorRef.current;
    if (indicator) {
      if (activeTab === "case") {
        indicator.style.transform = "translateX(0%)";
      } else {
        indicator.style.transform = "translateX(100%)";
      }
    }
  }, [activeTab]);

  return (
    <div
      role="tablist"
      aria-label="유형 선택"
      className="body-2-medium relative flex w-fit items-center justify-center rounded-full bg-[#0b1128]/60 p-0.5"
    >
      <div
        ref={indicatorRef}
        className="absolute top-0 left-0 h-full w-1/2 p-0.5 transition-transform duration-300 ease-in-out"
      >
        <div className="h-full w-full rounded-full bg-[#242a51]" />
      </div>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "case"}
        aria-controls={ariaControls}
        onClick={() => onTabChange("case")}
        className={cn(
          "z-10 rounded-full px-7 py-2 transition-colors duration-300 ease-in-out",
          {
            "text-primary-100": activeTab === "case",
            "text-gray-system-500": activeTab !== "case",
          },
        )}
      >
        사례 분석
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "url"}
        aria-controls={ariaControls}
        onClick={() => onTabChange("url")}
        className={cn(
          "z-10 rounded-full px-7 py-2 transition-colors duration-300 ease-in-out",
          {
            "text-primary-100": activeTab === "url",
            "text-gray-system-500": activeTab !== "url",
          },
        )}
      >
        URL 분석
      </button>
    </div>
  );
};
