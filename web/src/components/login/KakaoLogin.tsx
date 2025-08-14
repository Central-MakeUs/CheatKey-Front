import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

import { bridge } from "@/bridge";
import { useAuthStore } from "@/store/useAuthStore";

import kakaoLogo from "@/assets/logo/logo_kakao.svg";

export const KakaoLogin = () => {
  const navigate = useNavigate();
  const handleKakaoLogin = async () => {
    try {
      if (!bridge?.socialLogin) {
        throw new Error("브릿지 함수가 사용 불가능합니다");
      }

      const result = await bridge.socialLogin("kakao");

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
      }
      // TODO: @Ki-Tak 에러 처리랑 카카오 로그인 실패 처리 로직 수정 필요
      else {
        alert("카카오 로그인에 실패하였습니다.");
      }
    } catch (e) {
      alert("카카오 로그인에 실패하였습니다.");
      console.error(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="flex h-[3.125rem] w-full items-center justify-center gap-[1rem] rounded-xl bg-[#FFE812] px-3 text-center align-middle"
    >
      <img src={kakaoLogo} />
      <span className="body-4-medium leading-5 text-[#221F1F]">
        카카오톡으로 시작하기
      </span>
      <img src={kakaoLogo} className="invisible" />
    </button>
  );
};
