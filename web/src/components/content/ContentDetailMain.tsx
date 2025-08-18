// 배너 부분 데모데이 이후 다시 적용 예정
//import { useNavigate } from "react-router-dom";

//import { path } from "@/routes/path";

import { useFontSize } from "@/hooks/useFontSize";
import type {
  ContentCategory,
  ContentSectionType,
  FontSizeKey,
} from "@/types/content/content.types";
import { cn } from "@/utils/cn";
import { getPlatform } from "@/utils/getPlatform";

import { ContentRedirectBanner } from "@/components/content/ContentRedirectBanner";

import {
  DETAIL_MAIN_STYLE_CONFIG,
  FONT_SIZE_CONFIG,
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
} from "@/constants/contentPageConstants";

//import safe from "@/assets/images/result/safe.svg";
import android from "@/assets/logo/logo_store_android.svg";
import ios from "@/assets/logo/logo_store_ios.svg";

import { ImageWithLoader } from "../common/ImageWithLoader";

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
  //const navigate = useNavigate();

  const categoryStyles = DETAIL_MAIN_STYLE_CONFIG[category];
  const fontKey: FontSizeKey = isFontSizeLarge ? "large" : "default";

  const subtitleFontSize = FONT_SIZE_CONFIG.main.subtitle[fontKey];
  const bodyFontSize = FONT_SIZE_CONFIG.main.body[fontKey];

  return (
    <main className={cn("flex flex-1 flex-col gap-[1.875rem]", className)}>
      <ImageWithLoader
        src={image}
        alt={`${title}의 메인 사진`}
        className="aspect-[335/200] h-auto w-full rounded-xl"
        rounded="xl"
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
      {/*
      {getPlatform() !== "web" && (
        <ContentRedirectBanner
          image={safe}
          title="의심되는 URL, 텍스트가 있나요?"
          content="AI로 5초 안에 분석하러 가기"
          navigate={() => navigate(path.analyze.base)}
        />
      )}
        */}
      {getPlatform() === "web" && (
        <div className="flex flex-col gap-3">
          <ContentRedirectBanner
            image={android}
            title="지금 치트키를 만나보세요!"
            content="플레이 스토어에서 다운 받기"
            navigate={() => (window.location.href = GOOGLE_PLAY_URL)}
          />
          <ContentRedirectBanner
            image={ios}
            title="지금 치트키를 만나보세요!"
            content="앱 스토어에서 다운 받기"
            navigate={() => (window.location.href = APP_STORE_URL)}
          />
        </div>
      )}
    </main>
  );
};
