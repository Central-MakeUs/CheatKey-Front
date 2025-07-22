import { useParams } from "react-router-dom";

import { ContentDetailHeader } from "@/components/content/ContentDetailHeader";
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
        className="mt-header p-5"
        author="알려드림"
        title={data.title}
        date={data.date}
        authorProfile={authorProfile}
      />
    </div>
  );
};
