import type { HomeTrendingPostData } from "@/types/home/home.types";

import { NameTag } from "@/components/common/NameTag";

export const HomeTrendingPost = ({
  image,
  nickname,
  isAuthor,
  title,
  content,
}: HomeTrendingPostData) => {
  return (
    <div className="bg-gray-system-800 flex w-73 shrink-0 flex-col gap-2.5 rounded-xl p-4">
      <div className="flex w-full items-center gap-2">
        <img
          src={image}
          alt={`${nickname}님의 프로필 사진`}
          className="h-[1.875rem] w-[1.875rem]"
        />
        <NameTag
          type={isAuthor ? "community_primary" : "community_mono"}
          name={nickname}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <h1 className="body-4-medium text-gray-system-200 truncate">{title}</h1>
        <p className="caption-2-regular text-gray-system-500 line-clamp-2">
          {content}
        </p>
      </div>
    </div>
  );
};
