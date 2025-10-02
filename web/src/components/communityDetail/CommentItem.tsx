import { cn } from "@/lib/cn";
import type { Comment } from "@/types/community/community.types";
import { formatDetailDate } from "@/utils/formatUTCtoKR";

import { NameTag } from "@/components/common/NameTag";
import { ReplyCommentItem } from "@/components/communityDetail/ReplyCommentItem";

import RemoveIcon from "@/assets/icons/remove.svg?react";
import TemporaryProfilePic from "@/assets/images/temporary_profile_pic.png";

interface CommentItemProps {
  comment: Comment;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (commentId: number) => void;
}

export const CommentItem = ({
  comment,
  isSelected,
  onSelect,
  onDelete,
}: CommentItemProps) => {
  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-2.5 px-5 py-3.5",
          isSelected ? "bg-gray-system-800" : "bg-bg-100",
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={TemporaryProfilePic}
              alt="유저의 프로필 사진"
              className="h-[1.875rem] w-[1.875rem] rounded-full"
            />

            <NameTag
              name={comment.authorNickname}
              type={comment.canDelete ? "community_primary" : "community_mono"}
              className="mr-3 ml-2"
            />
            <p className="text-gray-system-700 body-5-regular">
              {formatDetailDate(comment.createdAt)}
            </p>
          </div>

          {comment.canDelete && (
            <button
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onDelete(comment.id);
              }}
              aria-label="댓글 삭제"
              type="button"
              className="h-6 w-6"
            >
              <RemoveIcon className="h-full w-full" />
            </button>
          )}
        </div>
        <p className="body-5-regular text-gray-system-500">{comment.content}</p>
        <div className="flex h-7.5 w-full justify-end">
          <button
            type="button"
            className="caption-1-medium text-gray-system-600 px-2 py-1"
            onClick={handleSelect}
          >
            답글 달기
          </button>
        </div>
      </div>

      {comment.children?.length > 0 && (
        <div className="px-5">
          {comment.children.map((reply, index) => (
            <ReplyCommentItem
              key={reply.id}
              reply={reply}
              isFirst={index === 0}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};
