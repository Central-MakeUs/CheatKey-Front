import { useState } from "react";

import { AppHeader } from "@/components/common/AppHeader";
import { CategoryTagGroup } from "@/components/common/CategoryTagGroup";

export type AriticleCategory = "알려드림" | "인터뷰";

export const ArticleListPage = () => {
  const [articleCategory, setArticleCategory] =
    useState<AriticleCategory>("알려드림");
  return (
    <div className="bg-bg-100 min-h-screen pb-21">
      {/** TODO: @Ki-Tak 추후에 알림 버튼 함수 수정해야함 */}
      <AppHeader title="콘텐츠" onNotification={() => console.log("알림")} />
      <CategoryTagGroup
        tags={["알려드림", "인터뷰"]}
        selected={articleCategory}
        onSelect={setArticleCategory}
        className="mt-header px-5 py-2.5"
      />
    </div>
  );
};
