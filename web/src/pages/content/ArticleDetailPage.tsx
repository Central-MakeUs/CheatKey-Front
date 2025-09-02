import { useRef } from "react";

import { useParams } from "react-router-dom";

import { FontSizeProvider } from "@/contexts/FontSizeContext";

import { ToTop } from "@/components/common/ToTop";
import { ContentDetailHeader } from "@/components/content/ContentDetailHeader";
import { ContentDetailMain } from "@/components/content/ContentDetailMain";
import { ContentDetailTitle } from "@/components/content/ContentDetailTitle";

import { articleMap } from "@/mocks/mockContentsData";

const ArticleDetailContent = () => {
  const { articleId } = useParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const data = articleId ? articleMap.get(parseInt(articleId, 10)) : undefined;

  if (!data) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <ContentDetailHeader />
      <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto">
        <ContentDetailTitle
          className="mt-header border-b-bg-50 mx-5 border-b py-5"
          category="알려드림"
          title={data.title}
          date={data.date}
          original={data.original}
        />
        <ContentDetailMain
          className="mb-10 p-5"
          category="알려드림"
          title={data.title}
          image={data.image}
          sections={data.sections}
        />
      </div>
      <ToTop bottom="2rem" scrollContainerRef={scrollRef} />
    </>
  );
};

export const ArticleDetailPage = () => (
  <FontSizeProvider>
    <ArticleDetailContent />
  </FontSizeProvider>
);
