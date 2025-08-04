import { useParams } from "react-router-dom";

import { FontSizeProvider } from "@/contexts/FontSizeContext";

import { ContentDetailHeader } from "@/components/content/ContentDetailHeader";
import { ContentDetailMain } from "@/components/content/ContentDetailMain";
import { ContentDetailTitle } from "@/components/content/ContentDetailTitle";

import { interviewMap } from "@/mocks/mockContentsData";

const InterviewDetailContent = () => {
  const { interviewId } = useParams();

  const data = interviewId
    ? interviewMap.get(parseInt(interviewId, 10))
    : undefined;

  if (!data) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="safearea bg-bg-100 flex h-screen flex-col">
      <ContentDetailHeader />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <ContentDetailTitle
          className="mt-header border-b-bg-50 mx-5 border-b py-5"
          category="인터뷰"
          title={data.title}
          date={data.date}
          original={data.original}
        />
        <ContentDetailMain
          className="p-5"
          category="인터뷰"
          title={data.title}
          image={data.image}
          sections={data.sections}
        />
      </div>
    </div>
  );
};

export const InterviewDetailPage = () => (
  <FontSizeProvider>
    <InterviewDetailContent />
  </FontSizeProvider>
);
