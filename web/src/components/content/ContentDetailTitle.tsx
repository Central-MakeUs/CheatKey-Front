import { useFontSize } from "@/contexts/FontSizeContext";
import type {
  ContentCategory,
  FontSizeKey,
  SourceStateKey,
} from "@/types/content/content.types";

import {
  AUTHOR_INFO_CONFIG,
  FONT_SIZE_CONFIG,
} from "@/constants/contentPageConstants";

import { cn } from "@/lib/cn";

interface ContentDetailTitleProps {
  original: string | null;
  category: ContentCategory;
  title: string;
  date: string;
  className?: string;
}

export const ContentDetailTitle = ({
  original,
  category,
  title,
  date,
  className,
}: ContentDetailTitleProps) => {
  const { isFontSizeLarge } = useFontSize();

  const sourceStateKey: SourceStateKey = original
    ? "withOriginal"
    : "withoutOriginal";
  const authorInfo = AUTHOR_INFO_CONFIG[category][sourceStateKey];

  const fontKey: FontSizeKey = isFontSizeLarge ? "large" : "default";
  const headingFontSize = FONT_SIZE_CONFIG.title.heading[fontKey];
  const metaFontSize = FONT_SIZE_CONFIG.title.meta[fontKey];

  return (
    <header className={cn("flex flex-col gap-2.5", className)}>
      <div className="caption-1-medium bg-bg-50 text-gray-system-500 flex h-[1.875rem] w-16 items-center justify-center rounded-full px-2">
        {category}
      </div>
      <h1 className={cn("text-base-0", headingFontSize)}>{title}</h1>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={authorInfo.icon}
            alt={authorInfo.altText}
            className="h-5 w-5"
          />
          <p className={cn(authorInfo.textColor, metaFontSize)}>
            {authorInfo.name}
          </p>
        </div>
        <time className={cn("text-gray-system-600", metaFontSize)}>{date}</time>
      </div>
    </header>
  );
};
