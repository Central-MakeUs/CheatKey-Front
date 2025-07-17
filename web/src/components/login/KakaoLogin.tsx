import { bridge } from "@/bridge";

import kakaoLogo from "@/assets/logo/logo-kakao.svg";

export const KakaoLogin = () => {
  const handleKakaoLogin = async () => {
    try {
      if (!bridge?.socialLogin) {
        throw new Error("브릿지 함수가 사용 불가능합니다");
      }

      const result = await bridge.socialLogin("kakao");

      alert(result);
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
