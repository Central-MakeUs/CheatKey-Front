import { Bubble } from "@/components/common/Bubble";
import { KakaoLogin } from "@/components/login/KakaoLogin";

export const LoginPage = () => {
  return (
    <div className="relative flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-base-0 h-40 w-40" />
        <h1 className="text-base-0 head-2-semibold mt-[1.375rem]">
          치트키에 오신 것을 환영합니다!
        </h1>
        <h2 className="text-gray-system-400 body-3-regular">
          치트키에 오신 것을 환영합니다!
        </h2>
      </div>
      <div className="absolute bottom-11 flex w-full flex-col items-center gap-8 px-5">
        <Bubble dir="bottom_center" text="AI로 분석하기" />
        <KakaoLogin />
      </div>
    </div>
  );
};
