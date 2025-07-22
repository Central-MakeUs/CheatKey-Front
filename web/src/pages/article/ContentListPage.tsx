import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { AppHeader } from "@/components/common/AppHeader";
import { CategoryTagGroup } from "@/components/common/CategoryTagGroup";

import authorProfile from "@/assets/icons/temporary_profile_pic.png";

import { articleData, interviewData } from "@/mocks/mockContentsData";
export type ContentCategory = "알려드림" | "인터뷰";

export const ContentListPage = () => {
  const [articleCategory, setArticleCategory] =
    useState<ContentCategory>("알려드림");
  return (
    <div className="bg-bg-100 min-h-screen pb-21">
      {/** TODO: @Ki-Tak 추후에 알림 버튼 함수 수정해야함 */}
      <AppHeader title="콘텐츠" onNotification={() => console.log("알림")} />
      <CategoryTagGroup
        tags={["알려드림", "인터뷰"]}
        selected={articleCategory}
        onSelect={setArticleCategory}
        className="mt-header border-bg-50 border-b px-5 py-2.5"
      />
      <AnimatePresence mode="wait">
        <motion.h2
          key={articleCategory}
          className="head-3-bold text-base-0 p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {articleCategory === "알려드림"
            ? "오늘의 사기 소식"
            : "실제 피해 사례를 모아봤어요"}
        </motion.h2>
      </AnimatePresence>
      <main className="flex h-fit w-full flex-col gap-5 px-5">
        {articleCategory === "알려드림" &&
          articleData.map((data) => (
            <ContentPreview
              key={data.title}
              title={data.title}
              image={data.image}
              date={data.date}
              original={data.original}
              contents={data.sections[0].contents as string}
            />
          ))}
        {articleCategory === "인터뷰" &&
          interviewData.map((data) => (
            <ContentPreview
              key={data.title}
              title={data.title}
              image={data.image}
              date={data.date}
              original={data.original}
              contents={data.sections[0].contents as string}
            />
          ))}
      </main>
    </div>
  );
};

interface ContentPreviewProps {
  title: string;
  contents: string;
  image: string;
  date: string;
  original: string | null;
}

const ContentPreview = ({
  title,
  contents,
  image,
  date,
  original,
}: ContentPreviewProps) => (
  <article className="bg-bg-50 flex flex-col gap-2.5 rounded-2xl p-3">
    <img
      src={image}
      alt={`${title}의 미리보기 이미지`}
      className="h-[8.75rem] w-full rounded-xl bg-white object-fill"
    />
    <h3 className="body-1-bold text-gray-system-50 mb-1 w-full truncate">
      {title}
    </h3>
    <p className="body-5-regular text-gray-system-400 line-clamp-2 text-ellipsis">
      {contents}
    </p>
    <footer className="flex w-full justify-between">
      <div className="flex items-center gap-2">
        <img
          src={authorProfile}
          alt="콘텐츠 작성자의 프로필"
          className="h-5 w-5"
        />
        <p className="body-4-medium text-primary-200">
          {original === null ? "커팅이" : "AI Jazeera"}
        </p>
      </div>
      <time className="caption-2-regular text-gray-system-600">{date}</time>
    </footer>
  </article>
);
