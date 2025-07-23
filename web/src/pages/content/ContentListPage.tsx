import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import type {
  ContentCategory,
  ContentType,
} from "@/types/content/content.types";

import { AppHeader } from "@/components/common/AppHeader";
import { CategoryTagGroup } from "@/components/common/CategoryTagGroup";
import { ContentPreview } from "@/components/content/ContentPreview";

import { articleData, interviewData } from "@/mocks/mockContentsData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const contentDataByCategory: Record<ContentCategory, ContentType[]> = {
  알려드림: articleData,
  인터뷰: interviewData,
};

export const ContentListPage = () => {
  const [articleCategory, setArticleCategory] =
    useState<ContentCategory>("알려드림");

  const currentData = contentDataByCategory[articleCategory];

  return (
    <div className="bg-bg-100 flex min-h-screen flex-col pb-29">
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
            {currentData.map((data) => (
              <ContentPreview
                key={`${data.id}-${data.title}`}
                id={data.id}
                title={data.title}
                image={data.image}
                date={data.date}
                original={data.original}
                sections={data.sections}
                author={articleCategory}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
