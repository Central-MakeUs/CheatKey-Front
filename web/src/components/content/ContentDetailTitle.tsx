import type { ContentCategory } from "@/types/content/content.types";

interface ContentDetailTileProps {
  author: ContentCategory;
  title: string;
  date: string;
  authorProfile: string;
  className?: string;
}

export const ContentDetailTitle = ({
  author,
  title,
  date,
  authorProfile,
  className,
}: ContentDetailTileProps) => {
  return (
    <header className={`flex w-full flex-col gap-2.5 ${className}`}>
      <div className="body-2-medium bg-bg-50 text-gray-system-500 h-9 w-fit min-w-20 content-center rounded-full px-2">
        {author}
      </div>
      <h1 className="head-3-bold text-base-0 line-clamp-2">{title}</h1>
      <div className="flex w-full items-center justify-between">
        <div className="body-4-medium flex items-center gap-2">
          <img
            src={authorProfile}
            alt="콘텐츠 작성자의 프로필"
            className="h-5 w-5"
          />
          <p className="text-primary-200">
            {author === "알려드림" && "커팅이"}
            {author === "인터뷰" && "커팅이 리포터"}
          </p>
        </div>
        <time className="caption-2-regular text-gray-system-600">{date}</time>
      </div>
    </header>
  );
};
