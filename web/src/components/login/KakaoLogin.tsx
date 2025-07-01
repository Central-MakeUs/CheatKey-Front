import kakaoLogo from "@/assets/logo/logo-kakao.svg";
import { path } from "@/routes/path";
import { useNavigate } from "react-router-dom";

export const KakaoLogin = () => {
  const navigate = useNavigate();
  const handleKakaoAuthorize = () => {
    navigate(path.auth.signup);
  };
  return (
    <button
      type="button"
      onClick={handleKakaoAuthorize}
      aria-label="카카오로 시작하기"
      className="flex h-13 w-full items-center justify-center gap-4 rounded-xl bg-[#FEE500] px-3 text-center align-middle"
    >
      <img src={kakaoLogo} className="h-5 w-5" />
      <span className="font-sans text-base leading-5 text-[#191919]">
        카카오로 시작하기
      </span>
    </button>
  );
};
