import type {
  ContentCategory,
  ContentSectionType,
} from "@/types/content/content.types";
import { cn } from "@/utils/cn";

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
  return (
    <main className={`flex flex-col gap-[1.875rem] ${className}`}>
      <img
        src={image}
        alt={`${title}의 메인 사진`}
        className="aspect-[335/200] h-auto w-full"
      />
      <div className={cn("flex flex-col gap-[1.875rem]")}>
        {sections.map((section, index) => (
          <section
            key={`${title}-${index}`}
            className={cn("flex flex-col", {
              "gap-5": category === "알려드림",
              "gap-3.5": category === "인터뷰",
            })}
          >
            <h2
              className={cn("head-4-semibold", {
                "text-gray-system-100": category === "알려드림",
                "text-primary-100": category === "인터뷰",
              })}
            >
              {category === "인터뷰" && "Q. "}
              {section.subtitle}
            </h2>
            <p className="body-5-regular text-gray-system-200">
              {section.contents}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
};
