import { useState } from "react";

import CuttingCry from "@/assets/images/cutting_cry.svg?react";

import { ConfirmModal } from "../common/ConfirmModal";

export const MyAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalType, setModalType] = useState<"logout" | "delete" | null>(null);

  const openModal = (type: "logout" | "delete") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    console.log("로그아웃 모달");
    closeModal();
  };

  const handleDeleteAccount = () => {
    console.log("회원 탈퇴 모달");
    closeModal();
  };

  return (
    <>
      <div className="text-gray-system-600 body-3-regular mt-[1.25rem] flex w-full justify-center gap-5">
        <span
          className="active:text-gray-system-700"
          onClick={() => openModal("logout")}
        >
          로그아웃
        </span>
        <span className="text-gray-system-700">|</span>
        <span
          className="active:text-gray-system-700"
          onClick={() => openModal("delete")}
        >
          회원 탈퇴
        </span>
      </div>

      {isModalOpen && modalType === "logout" && (
        <ConfirmModal
          title="로그아웃 하시겠어요?"
          description="다음에 다시 만나요!"
          onCancel={closeModal}
          onConfirm={handleLogout}
        />
      )}

      {isModalOpen && modalType === "delete" && (
        <ConfirmModal
          illustration={<CuttingCry />}
          title="정말 치트키를 떠나실 건가요?"
          description={
            "함께한 시간 동안 감사했습니다.\n언제든 다시 돌아오실 수 있어요. 기다릴게요."
          }
          onCancel={closeModal}
          onConfirm={handleDeleteAccount}
        />
      )}
    </>
  );
};
