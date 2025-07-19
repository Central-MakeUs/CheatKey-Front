import { useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

export type TabCategory = "url" | "case";

interface TabSwitcherProps {
  activeTab: TabCategory;
  onTabChange: (tab: TabCategory) => void;
}

export const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicator = indicatorRef.current;
    if (indicator) {
      if (activeTab === "url") {
        indicator.style.transform = "translateX(0%)";
      } else {
        indicator.style.transform = "translateX(100%)";
      }
    }
  }, [activeTab]);

  return (
    <div className="body-2-medium bg-base-50 relative flex w-fit items-center justify-center rounded-full p-0.5">
      <div
        ref={indicatorRef}
        className="absolute top-0 left-0 h-full w-1/2 p-0.5 transition-transform duration-300 ease-in-out"
      >
        <div className="bg-base-50 h-full w-full rounded-full" />
      </div>

      <button
        type="button"
        onClick={() => onTabChange("url")}
        className={cn(
          "rounded-full px-7 py-2 text-sm transition-colors duration-300 ease-in-out",
          {
            "text-gray-system-500": activeTab === "url",
            "text-gray-system-700": activeTab !== "url",
          },
        )}
      >
        URL 분석
      </button>
      <button
        type="button"
        onClick={() => onTabChange("case")}
        className={cn(
          "rounded-full px-7 py-2 text-sm transition-colors duration-300 ease-in-out",
          {
            "text-gray-system-500": activeTab === "case",
            "text-gray-system-700": activeTab !== "case",
          },
        )}
      >
        사례 분석
      </button>
    </div>
  );
};
