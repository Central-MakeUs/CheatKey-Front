import type { ContentCategory } from "@/types/content/content.types";
import { cn } from "@/utils/cn";

import report from "@/assets/icons/report.svg";
import authorProfile from "@/assets/icons/temporary_profile_pic.png";

interface ContentDetailTileProps {
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
}: ContentDetailTileProps) => {
  return (
    <header className={`flex flex-col gap-2.5 ${className}`}>
      <div className="caption-1-medium bg-bg-50 text-gray-system-500 flex h-[1.875rem] w-16 items-center justify-center rounded-full px-2">
        {category}
      </div>
      <h1 className="head-3-bold text-base-0 line-clamp-2">{title}</h1>
      <div className="flex w-full items-center justify-between">
        <div className="body-4-medium flex items-center gap-2">
          <img
            src={original ? report : authorProfile}
            alt={original ? "참고자료 아이콘" : "콘텐츠 작성자의 프로필"}
            className="h-5 w-5"
          />
          <p
            className={cn("", {
              "text-gray-system-200": category === "알려드림" && original,
              "text-primary-200":
                (category === "알려드림" && !original) || category === "인터뷰",
            })}
          >
            {category === "알려드림" && original && "참고자료"}
            {category === "알려드림" && !original && "커팅이"}
            {category === "인터뷰" && "커팅이 리포터"}
          </p>
        </div>
        <time className="caption-2-regular text-gray-system-600">{date}</time>
      </div>
    </header>
  );
};
