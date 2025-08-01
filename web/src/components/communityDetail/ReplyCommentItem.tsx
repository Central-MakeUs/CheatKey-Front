import type { Comment } from "@/types/community/community.types";

import { NameTag } from "@/components/common/NameTag";

import CommentReplyIcon from "@/assets/icons/comment_reply.svg?react";
import RemoveIcon from "@/assets/icons/remove.svg?react";
import TemporaryProfilePic from "@/assets/icons/temporary_profile_pic.svg";

export const ReplyCommentItem = ({
  reply,
  isFirst,
}: {
  reply: Comment;
  isFirst: boolean;
}) => {
  return (
    <div className="flex gap-1 py-3.5">
      <CommentReplyIcon className={isFirst ? "" : "invisible"} />

      <div className="w-full">
        <div className="mb-2.5 flex w-full items-center justify-between">
          <div className="flex items-center">
            <img
              src={TemporaryProfilePic}
              alt="유저의 프로필 사진"
              className="h-[1.875rem] w-[1.875rem] rounded-full"
            />

            {/* TODO: @tifsy 작성자일 때 type=commmunity_primary 처리 */}
            <NameTag
              name={reply.userNickname}
              type="community_mono"
              className="mr-3 ml-2"
            />
            <p className="text-gray-system-700 body-5-regular">
              {reply.createdAt}
            </p>
          </div>

          {/* TODO: @tifsy 작성자일 때만 아이콘 보여주도록 처리 */}
          <button aria-label="답글 삭제하기">
            <RemoveIcon />
          </button>
        </div>
        <p className="body-5-regular text-gray-system-500">{reply.content}</p>
      </div>
    </div>
  );
};
