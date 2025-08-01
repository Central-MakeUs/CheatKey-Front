import type { Comment } from "@/types/community/community.types";

import { NameTag } from "@/components/common/NameTag";
import { ReplyCommentItem } from "@/components/communityDetail/ReplyCommentItem";

import RemoveIcon from "@/assets/icons/remove.svg?react";
import TemporaryProfilePic from "@/assets/icons/temporary_profile_pic.svg";

export const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div>
      <div className="active:bg-gray-system-800 px-5 py-3.5">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={TemporaryProfilePic}
              alt="유저의 프로필 사진"
              className="h-[1.875rem] w-[1.875rem] rounded-full"
            />

            {/* TODO: @tifsy 작성자일 때 type=commmunity_primary 처리 */}
            <NameTag
              name={comment.userNickname}
              type="community_mono"
              className="mr-3 ml-2"
            />
            <p className="text-gray-system-700 body-5-regular">
              {comment.createdAt}
            </p>
          </div>

          <button className="댓글 삭제">
            <RemoveIcon />
          </button>
        </div>
        <p className="body-5-regular text-gray-system-500">{comment.content}</p>
      </div>

      {comment.children?.length > 0 && (
        <div className="px-5">
          {comment.children.map((reply, index) => (
            <ReplyCommentItem
              key={reply.id}
              reply={reply}
              isFirst={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};
