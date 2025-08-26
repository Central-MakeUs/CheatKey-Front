import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

import { cn } from "@/lib/cn";
import type { CommunityPost } from "@/types/community/community.types";
import { formatUTCtoKR } from "@/utils/formatUTCtoKR";

import { ImageWithLoader } from "@/components/common/ImageWithLoader";
import { NameTag } from "@/components/common/NameTag";
import { PostMenuButton } from "@/components/common/PostMenuButton";

import CommentIcon from "@/assets/icons/comment.svg?react";
//TODO: @tifsy 임시 프로필 이미지 제거
import TemporaryProfilePicIcon from "@/assets/images/temporary_profile_pic.png";

interface CommunityPostPreviewProps extends CommunityPost {
  onOpenMenu: (postId: number) => void;
}

export const CommunityPostPreview = ({
  id,
  onOpenMenu,
  authorNickname,
  createdAt,
  title,
  content,
  commentCount,
  thumbnailUrls = [],
}: CommunityPostPreviewProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="text-gray-system-600 space-y-2 py-3"
      onClick={() => navigate(path.community.detail(String(id)))}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          {/* TODO: @tifsy 사용자 프로필 사진 불러오기 */}
          <img
            src={TemporaryProfilePicIcon}
            alt="임시 프로필 사진"
            className="h-15 w-15 rounded-full"
          />
          <div className="flex flex-col gap-y-2.5">
            <NameTag
              name={authorNickname}
              type="community_mono"
              className="h-7"
            />
            <span className="text-gray-system-600 body-5-regular">
              {formatUTCtoKR(createdAt)}
            </span>
          </div>
        </div>

        <PostMenuButton postId={id} onOpenMenu={onOpenMenu} />
      </div>

      <div className="text-gray-system-100 body-1-bold">{title}</div>

      <p className="text-gray-system-400 body-5-regular line-clamp-3">
        {content}
      </p>

      {thumbnailUrls.length > 0 && (
        <div
          className={cn(
            "flex gap-[0.4375rem]",
            thumbnailUrls.length >= 3 && "scrollbar-hide overflow-x-auto",
          )}
        >
          {thumbnailUrls
            .slice(0, thumbnailUrls.length >= 3 ? thumbnailUrls.length : 2)
            .map((img, i) => (
              <div
                key={`${img}-${i}`}
                className={cn("h-[6.875rem] overflow-hidden rounded-lg", {
                  "w-full": thumbnailUrls.length === 1,
                  "w-1/2": thumbnailUrls.length === 2,
                  "w-[8.125rem] flex-shrink-0": thumbnailUrls.length >= 3,
                })}
              >
                <ImageWithLoader
                  src={img}
                  alt={`게시글 이미지 ${i + 1}`}
                  className="object-cover"
                />
              </div>
            ))}
        </div>
      )}

      <div className="text-gray-system-500 body-5-regular flex items-center justify-end gap-1 pt-1">
        <span>{commentCount}</span>
        <CommentIcon className="h-5 w-5" />
      </div>
    </div>
  );
};
