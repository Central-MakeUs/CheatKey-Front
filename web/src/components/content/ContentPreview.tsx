import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { path } from "@/routes/path";

import type { ContentCategory } from "@/pages/content/ContentListPage";
import type { ContentType } from "@/types/content/content.types";

import authorProfile from "@/assets/icons/temporary_profile_pic.png";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

interface ContentPreviewProps extends ContentType {
  author: ContentCategory;
}

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

  const handleNavigate = () => {
    if (author === "알려드림") {
      navigate(path.content.specific.article(id));
    } else if (author === "인터뷰") {
      navigate(path.content.specific.interview(id));
    }
  };

  return (
    <motion.article
      variants={itemVariants}
      className="bg-bg-50 flex flex-col gap-2.5 rounded-2xl p-3"
      onClick={handleNavigate}
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
        {sections?.[0]?.contents ?? ""}
      </p>
      <footer className="flex w-full items-center justify-between">
        <div className="body-4-medium flex items-center gap-2">
          <img
            src={authorProfile}
            alt="콘텐츠 작성자의 프로필"
            className="h-5 w-5"
          />
          <p className="text-primary-200">
            {author === "알려드림" && "커팅이"}
            {author === "인터뷰" && "커팅이 리포터"}
          </p>
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
};
