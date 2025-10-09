import { useNavigate } from "react-router-dom";

import { AppHeader } from "@/components/common/AppHeader";

import {
  ANALYZE_GUIDE_CONTENTS,
  ANALYZE_GUIDE_EXPLAIN,
  ANALYZE_GUIDE_FOOTER,
} from "@/constants/analyze/guide/analyzeGuideConstants";

import underline from "@/assets/icons/underline_guide.svg";

export const AnalyzeGuidePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto">
      <AppHeader title="AI 분석 가이드" onPrev={() => navigate(-1)} />
      <section className="border-b-bg-50 mt-header mb-10 flex w-full flex-col items-center gap-3 border-b px-5 pt-10 pb-9 text-center">
        <mark className="body-1-bold bg-primary-500 text-primary-50 w-fit rounded-md px-2 py-1">
          {ANALYZE_GUIDE_EXPLAIN.mark}
        </mark>
        <h1 className="text-base-0 mt-3.5 text-[1.625rem] leading-9 font-semibold">
          <span className="relative">
            <img
              className="absolute top-full h-[3px] w-full translate-y-1/2 object-cover"
              src={underline}
            />
            {ANALYZE_GUIDE_EXPLAIN.underline}
          </span>
          &nbsp;{ANALYZE_GUIDE_EXPLAIN.title}
          <br />
          <strong className="text-[2rem] leading-11 font-extrabold">
            {ANALYZE_GUIDE_EXPLAIN.strongTitle}
          </strong>
        </h1>
        <h2 className="body-2-medium text-gray-system-100 whitespace-pre-line">
          {ANALYZE_GUIDE_EXPLAIN.subTitle}
        </h2>
      </section>
      <section className="flex flex-col gap-7.5 px-5">
        {ANALYZE_GUIDE_CONTENTS.map((guide, index) => (
          <article key={`guide-${index}`} className="flex flex-col gap-5">
            <h3 className="text-base-0 flex items-center gap-2 text-lg leading-[1.4] font-bold">
              <mark className="body-1-bold text-base-0 bg-primary-400 rounded-full px-2.5 py-1 leading-[1.4]">
                {String(index + 1).padStart(2, "0")}
              </mark>
              {guide.title}
            </h3>
            <img
              className="h-auto w-full rounded-xl"
              src={guide.image}
              alt={`${index}번째 가이드 이미지`}
            />
            <p className="body-5-regular text-gray-system-200 p-2.5 text-center break-keep">
              {guide.content}
            </p>
          </article>
        ))}
      </section>
      <footer className="caption-1-medium text-gray-system-300 flex w-full flex-col items-center gap-2.5 py-15 text-center">
        <p>
          {ANALYZE_GUIDE_FOOTER.heading}
          <br />
          <a
            href={`mailto:${ANALYZE_GUIDE_FOOTER.email}`}
            className="underline"
          >
            {ANALYZE_GUIDE_FOOTER.email}
          </a>
          {ANALYZE_GUIDE_FOOTER.emailText}
        </p>
        <p>{ANALYZE_GUIDE_FOOTER.response}</p>
      </footer>
    </div>
  );
};
