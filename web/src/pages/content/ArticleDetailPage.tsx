import { useParams } from "react-router-dom";

import { ContentDetailHeader } from "@/components/content/ContentDetailHeader";
import { ContentDetailMain } from "@/components/content/ContentDetailMain";
import { ContentDetailTitle } from "@/components/content/ContentDetailTitle";

import authorProfile from "@/assets/icons/temporary_profile_pic.png";

import { articleMap } from "@/mocks/mockContentsData";

export const ArticleDetailPage = () => {
  const { articleId } = useParams();

  const data = articleId ? articleMap.get(parseInt(articleId, 10)) : undefined;

  if (!data) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="bg-bg-100 flex min-h-screen flex-col">
      <ContentDetailHeader />
      <ContentDetailTitle
        className="mt-header border-b-bg-50 mx-5 border-b py-5"
        category="알려드림"
        title={data.title}
        date={data.date}
        authorProfile={authorProfile}
      />
      <ContentDetailMain
        className="p-5"
        category="알려드림"
        title={data.title}
        image={data.image}
        sections={data.sections}
      />
    </div>
  );
};
