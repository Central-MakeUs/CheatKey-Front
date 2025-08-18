import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { path } from "@/routes/path";

import type {
  ContentType,
  ContentCategory,
  SourceStateKey,
} from "@/types/content/content.types";

import { ImageWithLoader } from "@/components/common/ImageWithLoader";

import { AUTHOR_INFO_CONFIG } from "@/constants/contentPageConstants";

interface ContentPreviewProps extends ContentType {
  author: ContentCategory;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const getDetailPath = (author: ContentCategory, id: number) => {
  const pathBuilder = {
    알려드림: path.content.specific.article,
    인터뷰: path.content.specific.interview,
  };
  return pathBuilder[author](id);
};

export const ContentPreview = ({
  id,
  title,
  sections,
  image,
  date,
  original,
  author,
}: ContentPreviewProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(getDetailPath(author, id));

  const sourceStateKey: SourceStateKey = original
    ? "withOriginal"
    : "withoutOriginal";
  const authorInfo = AUTHOR_INFO_CONFIG[author][sourceStateKey];

  return (
    <motion.article
      variants={itemVariants}
      className="bg-bg-50 flex cursor-pointer flex-col gap-2.5 rounded-2xl p-3"
      onClick={handleNavigate}
    >
      <div className="h-[8.75rem] w-full">
        <ImageWithLoader
          src={image}
          alt={`${title}의 미리보기 이미지`}
          className="rounded-xl object-cover"
          rounded="xl"
        />
      </div>
      <h3 className="body-1-bold text-gray-system-50 mb-1 w-full truncate">
        {title}
      </h3>
      <p className="body-5-regular text-gray-system-400 line-clamp-2 text-ellipsis">
        {sections?.[0]?.contents ?? ""}
      </p>
      <footer className="flex w-full items-center justify-between">
        <div className="body-4-medium flex items-center gap-2">
          <img
            src={authorInfo.icon}
            alt={authorInfo.altText}
            className="h-5 w-5"
          />
          <p className={authorInfo.textColor}>{authorInfo.name}</p>
        </div>
        <time className="caption-2-regular text-gray-system-600">{date}</time>
      </footer>
    </motion.article>
  );
};
