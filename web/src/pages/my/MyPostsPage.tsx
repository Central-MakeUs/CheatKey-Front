import { useNavigate } from "react-router-dom";

import { AppHeader } from "@/components/common/AppHeader";
import { ToTop } from "@/components/common/ToTop";
import { MyPostsPreview } from "@/components/my/MyPostsPreview";

import { mockMyPosts } from "@/mocks/mockMyPosts";
export const MyPostsPage = () => {
  const navigate = useNavigate();

  const posts = mockMyPosts;

  return (
    <div className="bg-bg-100 h-full">
      <AppHeader title="작성글 보기" onPrev={() => navigate(-1)} />
      <div className="px-5 pt-[4rem]">
        <span className="text-base-0 head-4-semibold w-fit py-[0.75rem]">
          총 2개의 작성글
        </span>
        <div className="divide-bg-50 divide-y">
          {posts.map((post) => (
            <MyPostsPreview
              nickname={post.nickname}
              key={post.id}
              date={post.date}
              title={post.title}
              content={post.content}
              commentCount={post.commentCount}
              images={post.images}
            />
          ))}
        </div>
      </div>
      <ToTop bottom="2rem" />
    </div>
  );
};
