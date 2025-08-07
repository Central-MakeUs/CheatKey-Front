import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { path } from "@/routes/path";

import { deleteAuthWithdraw } from "@/apis/auth/deleteAuthWithdraw";
import { postAuthLogout } from "@/apis/auth/postAuthLogout";

import { MyAccountModalRenderer } from "@/components/my/MyAccountModalRenderer";

export const MyAccount = () => {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState<"logout" | "delete" | null>(null);
  const closeModal = () => setModalType(null);

  const logoutMutation = useMutation({
    mutationFn: postAuthLogout,
    onSuccess: () => {
      navigate(path.auth.login);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: deleteAuthWithdraw,
    onSuccess: () => {
      navigate(path.auth.login);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    closeModal();
  };

  const handleDeleteAccount = () => {
    withdrawMutation.mutate();
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
