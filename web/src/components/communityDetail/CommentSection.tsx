import type { Comment } from "@/types/community/community.types";

import { NoResult } from "@/components/common/NoResult";
import { CommentItem } from "@/components/communityDetail/CommentItem";

interface CommentSectionProps {
  comments: Comment[];
  selectedCommentId: number | null;
  onSelectComment: (commentId: number) => void;
  onDeleteComment: (commentId: number) => void;
}

export const CommentSection = ({
  comments,
  selectedCommentId,
  onSelectComment,
  onDeleteComment,
}: CommentSectionProps) => {
  return (
    <div className="divide-bg-50 mb-25 divide-y">
      {!comments.length ? (
        <NoResult
          text={"댓글이 아직 달리지 않았어요.\n첫 댓글을 달아주세요!"}
          type="none"
        />
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isSelected={selectedCommentId === comment.id}
            onSelect={() => onSelectComment(comment.id)}
            onDelete={onDeleteComment}
          />
        ))
      )}
    </div>
  );
};
