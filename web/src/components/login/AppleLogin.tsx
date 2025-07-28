import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

import { bridge } from "@/bridge";

import appleLogo from "@/assets/logo/logo_apple.svg";

export const AppleLogin = () => {
  const navigate = useNavigate();
  const handleAppleLogin = async () => {
    try {
      if (!bridge?.socialLogin) {
        console.error("Bridge function is not available.");
        alert("브릿지 함수가 사용 불가능합니다.");
        throw new Error("브릿지 함수가 사용 불가능합니다");
      }

      console.log("Attempting Apple login via bridge...");
      const result = await bridge.socialLogin("apple");
      console.log("Bridge socialLogin result:", result);

      if (result.success) {
        console.log(
          "Apple login successful from bridge. User state:",
          result.data.userState,
        );
        if (result.data.userState === "PENDING") {
          navigate(path.auth.signup);
        } else if (result.data.userState === "ACTIVE") {
          navigate(path.home);
        }
      } else {
        console.error("Apple login failed on bridge side:", result.message);
        alert(
          `Apple 로그인에 실패하였습니다: ${result.message || "알 수 없는 오류"}`,
        );
      }
    } catch (e) {
      console.error("Error during Apple login process:", e);
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
