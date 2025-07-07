import CommentIcon from "@/assets/icons/comment.svg?react";
import CommunityPostMenuIcon from "@/assets/icons/community_post_menu.svg?react";
import EllipseIcon from "@/assets/icons/ellipse.svg?react";
//TODO: @tifsy 임시 프로필 이미지 제거
import TemporaryProfilePicIcon from "@/assets/icons/temporary_profile_pic.png";

//TODO: @tifsy 커뮤니티 타입 정리
interface CommunityPostPreviewProps {
  nickname: string;
  date: string;
  category: string;
  title: string;
  content: string;
  commentCount: number;
  images?: string[];
}

const CommunityPostPreview = ({
  nickname,
  date,
  category,
  title,
  content,
  commentCount,
  images = [],
}: CommunityPostPreviewProps) => {
  return (
    <div className="text-gray-system-600 space-y-2 rounded-xl py-3">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          {/* TODO: @tifsy 사용자 프로필 사진 불러오기 */}
          <img
            src={TemporaryProfilePicIcon}
            alt="임시 프로필 사진"
            className="h-15 w-15 rounded-[100px]"
          />
          <div className="flex flex-col gap-y-[10px]">
            <div className="bg-bg-50 text-gray-system-500 body-4-medium h-7 w-fit content-center rounded-lg px-[10px] py-1">
              {nickname}
            </div>
            <span className="text-gray-system-600 body-5-regular">{date}</span>
          </div>
        </div>

        <button aria-label="커뮤니티 글 메뉴 열기">
          <CommunityPostMenuIcon className="text-gray-system-500 h-6 w-6" />
        </button>
      </div>

      <div className="text-primary-400 body-2-medium flex gap-[6px]">
        <EllipseIcon className="h-4 w-4" aria-hidden />
        {category}
      </div>

      <div className="text-gray-system-100 body-1-bold">{title}</div>

      <p className="text-gray-system-400 body-5-regular line-clamp-3">
        {content}
      </p>

      {images.length > 0 && (
        <>
          {images.length === 1 && (
            <img
              src={images[0]}
              alt={`게시글 이미지 1`}
              className="h-[110px] w-full rounded-lg object-cover"
            />
          )}

          {images.length === 2 && (
            <div className="flex gap-[7px]">
              {images.slice(0, 2).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`게시글 이미지 ${i}`}
                  className="h-[110px] w-1/2 rounded-lg object-cover"
                />
              ))}
            </div>
          )}

          {images.length >= 3 && (
            <div className="scrollbar-hide flex gap-[7px] overflow-x-auto">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`게시글 이미지 ${i}`}
                  className="h-[110px] w-[130px] flex-shrink-0 rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className="text-gray-system-500 body-5-regular flex items-center justify-end gap-1 pt-1">
        <span>{commentCount}</span>
        <CommentIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export default CommunityPostPreview;
