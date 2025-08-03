import { ConfirmModal } from "@/components/common/ConfirmModal";

import CuttingCry from "@/assets/images/cutting_cry.svg?react";

interface MyAccountModalRendererProps {
  modalType: "logout" | "delete" | null;
  closeModal: () => void;
  handleLogout: () => void;
  handleDeleteAccount: () => void;
}

export const MyAccountModalRenderer = ({
  modalType,
  closeModal,
  handleLogout,
  handleDeleteAccount,
}: MyAccountModalRendererProps) => {
  switch (modalType) {
    case "logout":
      return (
        <ConfirmModal
          title="로그아웃 하시겠어요?"
          description="다음에 다시 만나요!"
          onCancel={closeModal}
          onConfirm={handleLogout}
        />
      );
    case "delete":
      return (
        <ConfirmModal
          illustration={<CuttingCry />}
          title="정말 치트키를 떠나실 건가요?"
          description={
            "함께한 시간 동안 감사했습니다.\n언제든 다시 돌아오실 수 있어요. 기다릴게요."
          }
          onCancel={closeModal}
          onConfirm={handleDeleteAccount}
        />
      );
    default:
      return null;
  }
};
