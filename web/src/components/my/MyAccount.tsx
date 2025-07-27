import { useState } from "react";

import { MyAccountModalRenderer } from "@/components/my/MyAccountModalRenderer";

export const MyAccount = () => {
  const [modalType, setModalType] = useState<"logout" | "delete" | null>(null);
  const closeModal = () => setModalType(null);

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
          onClick={() => setModalType("logout")}
        >
          로그아웃
        </span>
        <span className="text-gray-system-700">|</span>
        <span
          className="active:text-gray-system-700"
          onClick={() => setModalType("delete")}
        >
          회원 탈퇴
        </span>
      </div>

      <MyAccountModalRenderer
        modalType={modalType}
        closeModal={closeModal}
        handleLogout={handleLogout}
        handleDeleteAccount={handleDeleteAccount}
      />
    </>
  );
};
