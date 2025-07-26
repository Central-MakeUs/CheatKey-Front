import { ConfirmModal } from "./ConfirmModal";

interface DeleteModalProps {
  id: number;
  onCancel: () => void;
  onConfirm: (postId: number) => void;
}

export const DeleteModal = ({ id, onCancel, onConfirm }: DeleteModalProps) => {
  return (
    <ConfirmModal
      title="게시물을 삭제하시겠어요?"
      description="삭제하면 다시는 볼 수 없어요!"
      onCancel={onCancel}
      onConfirm={() => onConfirm(id)}
    />
  );
};
