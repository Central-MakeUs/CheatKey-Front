import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

import { useFontSize } from "@/hooks/useFontSize";
import type {
  ContentCategory,
  ContentSectionType,
  FontSizeKey,
} from "@/types/content/content.types";
import { cn } from "@/utils/cn";

import { ContentRedirectBanner } from "@/components/content/ContentRedirectBanner";

import {
  DETAIL_MAIN_STYLE_CONFIG,
  FONT_SIZE_CONFIG,
} from "@/constants/contentPageConstants";

import safe from "@/assets/images/result/safe.svg";

interface ContentDetailMainProps {
  category: ContentCategory;
  title: string;
  image: string;
  sections: ContentSectionType[];
  className?: string;
}

export const ContentDetailMain = ({
  category,
  title,
  image,
  sections,
  className,
}: ContentDetailMainProps) => {
  const { isFontSizeLarge } = useFontSize();
  const navigate = useNavigate();

  const categoryStyles = DETAIL_MAIN_STYLE_CONFIG[category];
  const fontKey: FontSizeKey = isFontSizeLarge ? "large" : "default";

  const subtitleFontSize = FONT_SIZE_CONFIG.main.subtitle[fontKey];
  const bodyFontSize = FONT_SIZE_CONFIG.main.body[fontKey];

  return (
    <main className={cn("flex flex-1 flex-col gap-[1.875rem]", className)}>
      <img
        src={image}
        alt={`${title}의 메인 사진`}
        className="aspect-[335/200] h-auto w-full"
      />
      <div className={cn("flex flex-col gap-[1.875rem]")}>
        {sections.map((section, index) => (
          <section
            key={`${title}-${index}`}
            className={cn("flex flex-col", categoryStyles.sectionGap)}
          >
            <h2
              className={cn(
                "whitespace-pre-line",
                categoryStyles.subtitleColor,
                subtitleFontSize,
              )}
            >
              {category === "인터뷰" && "Q. "}
              {section.subtitle}
            </h2>
            <p
              className={cn(
                "text-gray-system-200 whitespace-pre-line",
                bodyFontSize,
              )}
            >
              {section.contents}
            </p>
          </section>
        ))}
      </div>
      <ContentRedirectBanner
        image={safe}
        title="의심되는 URL, 텍스트가 있나요?"
        content="AI로 5초 안에 분석하러 가기"
        navigate={() => navigate(path.analyze.base)}
      />
    </main>
  );
};
