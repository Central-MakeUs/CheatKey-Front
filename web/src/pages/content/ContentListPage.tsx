import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { AppHeader } from "@/components/common/AppHeader";
import { CategoryTagGroup } from "@/components/common/CategoryTagGroup";
import { ContentPreview } from "@/components/content/ContentPreview";

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
                  id={data.id}
                  title={data.title}
                  image={data.image}
                  date={data.date}
                  original={data.original}
                  sections={data.sections}
                  author="알려드림"
                />
              ))}
            {articleCategory === "인터뷰" &&
              interviewData.map((data) => (
                <ContentPreview
                  key={data.title}
                  id={data.id}
                  title={data.title}
                  image={data.image}
                  date={data.date}
                  original={data.original}
                  sections={data.sections}
                  author="인터뷰"
                />
              ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
