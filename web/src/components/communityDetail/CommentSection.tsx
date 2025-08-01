import type { Comment } from "@/types/communityDetail/communityDetail.types";

import { NoResult } from "@/components/common/NoResult";
import { CommentItem } from "@/components/communityDetail/CommentItem";

interface CommentSectionProps {
  comments: Comment[];
}

export const CommentSection = ({ comments }: CommentSectionProps) => {
  return (
    <div className="divide-bg-50 mb-25 divide-y">
      {!comments.length ? (
        <NoResult
          text={"댓글이 아직 달리지 않았어요.\n첫 댓글을 달아주세요!"}
          type="none"
        />
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};
