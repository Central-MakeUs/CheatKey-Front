import { useImageCloseUp } from "@/hooks/useImageCloseUp";
import { cn } from "@/utils/cn";

import { PostMenuButton } from "@/components/common/PostMenuButton";
//TODO: @tifsy 임시 프로필 이미지 제거
import { ImageCloseUpModal } from "@/components/communityDetail/ImageCloseUpModal";

import TemporaryProfilePicIcon from "@/assets/icons/temporary_profile_pic.svg";

type CommunityPostContentProps = {
  postId: number;
  nickname: string;
  date: string;
  title: string;
  content: string;
  images?: string[];
  canDelete: boolean;
  onOpenMenu: (postId: number) => void;
};

export const CommunityPostContent = ({
  postId,
  nickname,
  date,
  title,
  content,
  images = [],
  canDelete,
  onOpenMenu,
}: CommunityPostContentProps) => {
  const { selectedImage, openImageCloseUp, closeImageCloseUp } =
    useImageCloseUp();

  return (
    <>
      <div className="space-y-2 px-5 py-5">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            {/* TODO: @tifsy 사용자 프로필 사진 불러오기 */}
            <img
              src={TemporaryProfilePicIcon}
              alt={`${nickname}님의 프로필 이미지`}
              className="h-15 w-15 rounded-full"
            />
            <div className="flex flex-col gap-y-2.5">
              <div
                className={cn(
                  "body-4-medium h-7 w-fit content-center rounded-lg px-2.5 py-1",
                  {
                    "bg-bg-50 text-gray-system-500": !canDelete,
                    "bg-gray-system-800 text-primary-300": canDelete,
                  },
                )}
              >
                {nickname}
              </div>
              <span className="text-gray-system-600 body-5-regular">
                {date}
              </span>
            </div>
          </div>
          {!canDelete && (
            <PostMenuButton postId={postId} onOpenMenu={onOpenMenu} />
          )}
        </div>

        <div className="text-gray-system-100 body-1-bold">{title}</div>

        <p className="text-gray-system-400 body-5-regular line-clamp-3">
          {content}
        </p>

        {images.length > 0 && (
          <div
            className={cn(
              "flex gap-[0.4375rem]",
              images.length >= 3 && "scrollbar-hide overflow-x-auto",
            )}
          >
            {images
              .slice(0, images.length >= 3 ? images.length : 2)
              .map((img, i) => (
                <img
                  key={`${img}-${i}`}
                  src={img}
                  alt={`${nickname}님의 게시글 이미지 ${i + 1}`}
                  className={cn("h-[6.875rem] rounded-lg object-cover", {
                    "w-full": images.length === 1,
                    "w-1/2": images.length === 2,
                    "w-[8.125rem] flex-shrink-0": images.length >= 3,
                  })}
                  onClick={() => openImageCloseUp(img)}
                />
              ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <ImageCloseUpModal
          imageUrl={selectedImage}
          onClose={closeImageCloseUp}
        />
      )}
    </>
  );
};
