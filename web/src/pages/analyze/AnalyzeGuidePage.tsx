import { useNavigate } from "react-router-dom";

import { AppHeader } from "@/components/common/AppHeader";

import { ANALYZE_GUIDE_EXPLAIN } from "@/constants/analyze/guide/analyzeGuideConstants";

import underline from "@/assets/icons/underline_guide.svg";

export const AnalyzeGuidePage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-1 flex-col items-center px-5">
      <AppHeader title="AI 분석 가이드" onPrev={() => navigate(-1)} />
      <section className="border-b-bg-50 mt-header flex w-full flex-col items-center gap-3 border-b py-9 pt-10 text-center">
        <mark className="body-1-bold bg-primary-500 text-primary-50 w-fit rounded-md px-2 py-1">
          {ANALYZE_GUIDE_EXPLAIN.MARK}
        </mark>
        <h1 className="text-base-0 mt-3.5 text-[1.625rem] leading-9 font-semibold">
          <span className="relative">
            <img
              className="absolute top-full h-[3px] w-full translate-y-1/2 object-cover"
              src={underline}
            />
            {ANALYZE_GUIDE_EXPLAIN.UNDERLINE}
          </span>
          &nbsp;{ANALYZE_GUIDE_EXPLAIN.TITLE}
          <br />
          <strong className="text-[2rem] leading-11 font-extrabold">
            {ANALYZE_GUIDE_EXPLAIN.STRONG_TITLE}
          </strong>
        </h1>
        <h2 className="body-2-medium text-gray-system-100 whitespace-pre-line">
          {ANALYZE_GUIDE_EXPLAIN.SUB_TITLE}
        </h2>
      </section>
    </div>
  );
};
