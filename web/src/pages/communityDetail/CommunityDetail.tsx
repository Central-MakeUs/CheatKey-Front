import { useNavigate, useParams } from "react-router-dom";

import { AppHeader } from "@/components/common/AppHeader";
import { CommentInput } from "@/components/communityDetail/CommentInput";
import { CommentSection } from "@/components/communityDetail/CommentSection";
import { CommunityPostContent } from "@/components/communityDetail/CommunityPostContent";

import { mockCommunityDetailCommentsData } from "@/mocks/mockCommunityDetailCommentsData";
import { mockCommunityFeedPreviews } from "@/mocks/mockCommunityFeedPreviews";

export const CommunityDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const post = mockCommunityFeedPreviews.find((item) => String(item.id) === id);
  if (!post) {
    console.log("‼️게시글 없음");
    return null;
  }
  const { title, nickname, date, content, images } = post;

  const commentsForPost = mockCommunityDetailCommentsData.filter(
    (comment) => comment.postId === Number(id),
  );

  return (
    <div className="bg-bg-100 safearea flex h-screen flex-col">
      <AppHeader
        title={`${nickname}님의 글`}
        onPrev={() => navigate(-1)}
        onNotification={() => console.log("🚨알림 클릭됨")}
        className="bg-bg-100"
      />
      <div className="divide-bg-50 flex-1 divide-y overflow-y-auto pt-15">
        <CommunityPostContent {...{ title, nickname, date, content, images }} />
        <p className="text-gray-system-400 body-2-medium px-5 py-2.5">
          댓글 30개
        </p>
        <CommentSection comments={commentsForPost} />
      </div>

      <div className="border-t-1">
        <CommentInput />
      </div>
    </div>
  );
};
