import CommunityPostMenuIcon from "@/assets/icons/community_post_menu.svg?react";

interface PostMenuButtonProps {
  postId: number;
  onOpenMenu: (postId: number) => void;
}

export const PostMenuButton = ({ postId, onOpenMenu }: PostMenuButtonProps) => {
  return (
    <button
      aria-label="커뮤니티 글 메뉴 열기"
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onOpenMenu(postId);
      }}
    >
      <CommunityPostMenuIcon className="text-gray-system-500 h-6 w-6" />
    </button>
  );
};
