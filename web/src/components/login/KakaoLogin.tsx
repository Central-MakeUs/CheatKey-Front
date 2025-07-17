import { bridge } from "@/bridge";

import kakaoLogo from "@/assets/logo/logo-kakao.svg";

export const KakaoLogin = () => {
  const handleKakaoLogin = async () => {
    try {
      const result = await bridge.socialLogin("kakao");

      if (result.success) {
        alert("카카오 로그인 성공! AccessToken:" + result.accessToken);
      } else {
        alert(result.message ?? "알 수 없는 오류가 발생했습니다.");
      }
    } catch (e) {
      alert("브리지 통신 오류:" + e);
    }
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
