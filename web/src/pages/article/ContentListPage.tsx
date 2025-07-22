import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { AppHeader } from "@/components/common/AppHeader";
import { CategoryTagGroup } from "@/components/common/CategoryTagGroup";

import authorProfile from "@/assets/icons/temporary_profile_pic.png";

import { articleData, interviewData } from "@/mocks/mockContentsData";

export type ContentCategory = "알려드림" | "인터뷰";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const ContentListPage = () => {
  const [articleCategory, setArticleCategory] =
    useState<ContentCategory>("알려드림");
  return (
    <div className="bg-bg-100 min-h-screen pb-29">
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
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={articleCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="flex h-fit w-full flex-col gap-5 px-5"
          >
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
          </motion.div>
        </AnimatePresence>
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

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const ContentPreview = ({
  title,
  contents,
  image,
  date,
  original,
}: ContentPreviewProps) => (
  <motion.article
    variants={itemVariants}
    className="bg-bg-50 flex flex-col gap-2.5 rounded-2xl p-3"
  >
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
    <footer className="flex w-full items-center justify-between">
      <div className="body-4-medium flex items-center gap-2">
        <img
          src={authorProfile}
          alt="콘텐츠 작성자의 프로필"
          className="h-5 w-5"
        />

        <p className="text-primary-200">커팅이</p>
        {original !== null && (
          <>
            <div className="bg-gray-system-700 h-5 w-[0.5px]" />
            <span className="text-gray-system-600">참고자료</span>
          </>
        )}
      </div>
      <time className="caption-2-regular text-gray-system-600">{date}</time>
    </footer>
  </motion.article>
);
