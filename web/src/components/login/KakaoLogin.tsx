import { API_DOMAINS } from "@/constants/apiConstants";

import kakaoLogo from "@/assets/logo/logo-kakao.svg";

export const KakaoLogin = () => {
  const redirectURL =
    (import.meta.env.VITE_API_BASE_URL as string) + API_DOMAINS.GET_KAKAO_LOGIN;

  const handleKakaoLogin = () => {
    window.location.href = redirectURL;
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="flex h-13 w-full items-center justify-center gap-4 rounded-xl bg-[#FEE500] px-3 text-center align-middle"
    >
      <img src={kakaoLogo} className="h-5 w-5" />
      <span className="font-sans text-base leading-5 text-[#191919]">
        카카오로 시작하기
      </span>
    </button>
  );
};
