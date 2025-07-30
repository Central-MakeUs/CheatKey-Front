import { AnalyzeLoader } from "@/components/animation/AnalyzeLoader";

export const AnalyzeLoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-transparent to-[rgba(0,40,255,0.20)]">
      <div className="absolute bottom-0 left-0 h-full w-full animate-pulse bg-gradient-to-b from-transparent to-[rgba(0,40,255,0.20)]" />

      <div className="z-10 mt-19 flex w-full flex-col gap-2.5 text-center">
        <h1 className="head-2-semibold text-base-0 animate-pulse">
          AI가 분석중입니다...
        </h1>
        <h2 className="body-2-medium text-primary-50 animate-pulse">
          잠시만 기다려주세요...
        </h2>
      </div>
      <AnalyzeLoader width={300} height={300} speed={6} className="z-10" />
      <p className="body-5-regular text-primary-200 z-10 mb-15 w-full animate-pulse text-center">
        AI보안 엔진이 최신 사기 유형과 피싱 데이터를
        <br />
        기반으로 정밀 분석 중입니다...
      </p>
    </div>
  );
};
