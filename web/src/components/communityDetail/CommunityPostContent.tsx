import { useImageSlider } from "@/hooks/community/useImageSlider";

import { ImageWithLoader } from "@/components/common/ImageWithLoader";
import { MenuButton } from "@/components/common/MenuButton";
import { ImageCloseUpModal } from "@/components/communityDetail/ImageCloseUpModal";

import { cn } from "@/lib/cn";

import TemporaryProfilePicIcon from "@/assets/images/temporary_profile_pic.png";

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
  const {
    isSliderOpen,
    sliderImages,
    initialIndex,
    openImageSlider,
    closeImageSlider,
  } = useImageSlider();

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

          <MenuButton id={postId} onOpenMenu={onOpenMenu} />
        </div>

        <div className="text-gray-system-100 body-1-bold">{title}</div>

        <p className="text-gray-system-400 body-5-regular whitespace-pre-line">
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
                <div
                  key={`${img}-${i}`}
                  className={cn("h-[6.875rem] overflow-hidden rounded-lg", {
                    "w-full": images.length === 1,
                    "w-1/2": images.length === 2,
                    "w-[8.125rem] flex-shrink-0": images.length >= 3,
                  })}
                  onClick={() => openImageSlider(images, i)}
                >
                  <ImageWithLoader
                    src={img}
                    alt={`${nickname}님의 게시글 이미지 ${i + 1}`}
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      {isSliderOpen && (
        <ImageCloseUpModal
          images={sliderImages}
          initialIndex={initialIndex}
          onClose={closeImageSlider}
        />
      )}
    </>
  );
};
