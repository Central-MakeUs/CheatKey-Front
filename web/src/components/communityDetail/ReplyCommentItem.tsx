import type { Comment } from "@/types/community/community.types";
import { formatDetailDate } from "@/utils/formatUTCtoKR";

import { NameTag } from "@/components/common/NameTag";

import BlockIcon from "@/assets/icons/block.svg";
import CommentReplyIcon from "@/assets/icons/comment_reply.svg?react";
import RemoveIcon from "@/assets/icons/remove.svg?react";
import TemporaryProfilePic from "@/assets/images/temporary_profile_pic.png";

import { MenuButton } from "../common/MenuButton";

interface ReplyCommentItemProps {
  reply: Comment;
  isFirst: boolean;
  onDelete: (commentId: number) => void;
  onOpenMenu: (commentId: number) => void;
}

export const ReplyCommentItem = ({
  reply,
  isFirst,
  onDelete,
  onOpenMenu,
}: ReplyCommentItemProps) => {
  return (
    <div className="flex gap-1 py-3.5">
      <CommentReplyIcon className={isFirst ? "" : "invisible"} />
      {reply.status !== "BLOCKED_BY_USER" ? (
        <div className="w-full">
          <div className="mb-2.5 flex w-full items-center justify-between">
            <div className="flex items-center">
              <img
                src={TemporaryProfilePic}
                alt="유저의 프로필 사진"
                className="h-[1.875rem] w-[1.875rem] rounded-full"
              />

              <NameTag
                name={reply.authorNickname}
                type={reply.canDelete ? "community_primary" : "community_mono"}
                className="mr-3 ml-2"
              />
              <p className="text-gray-system-700 body-5-regular">
                {formatDetailDate(reply.createdAt)}
              </p>
            </div>
            {reply.status === "ACTIVE" &&
              (reply.canDelete ? (
                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onDelete(reply.id);
                  }}
                  aria-label="답글 삭제하기"
                  className="h-6 w-6"
                >
                  <RemoveIcon className="h-full w-full" />
                </button>
              ) : (
                <MenuButton id={reply.id} onOpenMenu={onOpenMenu} />
              ))}
          </div>
          <p className="body-5-regular text-gray-system-500">{reply.content}</p>
          {/** 추후, 언급하기 기능 추가시 변경 예정 */}
          <div className="flex h-7.5 w-full justify-end" />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <img className="h-7.5 w-7.5" src={BlockIcon} alt="차단된 유저" />
          <p className="body-5-regular text-gray-system-500">
            차단한 작성자의 댓글입니다.
          </p>
        </div>
      )}
    </div>
  );
};
