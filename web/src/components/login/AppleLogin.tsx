import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

import { bridge } from "@/bridge";
import { useAuthStore } from "@/store/useAuthStore";

import appleLogo from "@/assets/logo/logo_apple.svg";

export const AppleLogin = () => {
  const navigate = useNavigate();
  const handleAppleLogin = async () => {
    try {
      if (!bridge?.socialLogin) {
        alert("브릿지 함수가 사용 불가능합니다.");
        throw new Error("브릿지 함수가 사용 불가능합니다");
      }

      const result = await bridge.socialLogin("apple");

      console.log(result);
      if (result.success) {
        useAuthStore.getState().setAccessToken(result.data.accessToken);
        if (result.data.userState === "PENDING") {
          navigate(path.auth.signup);
        } else if (result.data.userState === "ACTIVE") {
          navigate(path.home);
        } else if (result.data.userState === "BANNED") {
          alert("임시 차단된 계정입니다.");
        } else if (result.data.userState === "INACTIVE") {
          alert("영구 정지된 계정입니다.");
        } else if (result.data.userState === "WITHDRAWN") {
          alert("탈퇴 후 30일이 지나야 재가입이 가능합니다.");
        }
      } else {
        alert(
          `Apple 로그인에 실패하였습니다: ${result.message || "알 수 없는 오류"}`,
        );
      }
    } catch {
      alert(`Apple 로그인에 실패하였습니다.`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAppleLogin}
      className="border-gray-system-600 mt-[0.625rem] flex h-[3.125rem] w-full items-center justify-center gap-[2.125rem] rounded-xl border bg-transparent px-3"
    >
      <img src={appleLogo} />
      <span className="text-gray-system-300 body-4-medium">
        애플로 시작하기
      </span>
      <img src={appleLogo} className="invisible" />
    </button>
  );
};
