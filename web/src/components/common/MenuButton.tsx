import CommunityPostMenuIcon from "@/assets/icons/post_menu.svg?react";

interface MenuButtonProps {
  id: number;
  onOpenMenu: (id: number) => void;
}

export const MenuButton = ({ id, onOpenMenu }: MenuButtonProps) => {
  return (
    <button
      aria-label="커뮤니티 글 메뉴 열기"
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onOpenMenu(id);
      }}
    >
      <CommunityPostMenuIcon className="text-gray-system-500 h-6 w-6" />
    </button>
  );
};
