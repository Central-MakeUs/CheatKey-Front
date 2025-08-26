import { useNavigate } from "react-router-dom";

import type { HomeTrendingPostData } from "@/types/home/home.types";
import { generatePath } from "@/utils/generatePath";

import { NameTag } from "@/components/common/NameTag";

import { PAGE_PATH } from "@/constants/path";

export const HomeTrendingPost = ({
  id,
  title,
  content,
  authorProfileImageUrl,
  authorNickname,
}: HomeTrendingPostData) => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() =>
        navigate(
          generatePath(PAGE_PATH.COMMUNITY.SPECIFIC.DETAIL, {
            postId: String(id),
          }),
        )
      }
      className="bg-gray-system-800 flex w-73 shrink-0 flex-col gap-2.5 rounded-xl p-4"
    >
      <div className="flex w-full items-center gap-2">
        <img
          src={authorProfileImageUrl}
          alt={`${authorNickname}님의 프로필 사진`}
          className="h-[1.875rem] w-[1.875rem]"
        />
        <NameTag type={"community_mono"} name={authorNickname} />
      </div>
      <div className="flex w-full flex-col gap-1">
        <h1 className="body-4-medium text-gray-system-200 truncate">{title}</h1>
        <p className="caption-2-regular text-gray-system-500 line-clamp-2 h-9">
          {content}
        </p>
      </div>
    </a>
  );
};
