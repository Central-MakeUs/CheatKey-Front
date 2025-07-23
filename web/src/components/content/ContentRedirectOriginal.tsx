import Arrow from "@/assets/icons/arrow_right_bold.svg?react";

interface ContentRedirectOriginalProps {
  original: string;
}

export const ContentRedirectOriginal = ({
  original,
}: ContentRedirectOriginalProps) => {
  return (
    // TODO: @Ki-Tak 추후 네이티브 기능 연동하여 외부 브라우저로 가게끔 해야 함
    <a
      href={original}
      target="_blank"
      rel="noopener oreferrer"
      className="bg-primary-400 fixed bottom-5 left-1/2 flex h-[2.375rem] -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-full px-3"
    >
      <span className="body-1-bold text-base-0">원문 보러가기</span>
      <span className="sr-only">(새 창에서 열림)</span>
      <Arrow className="text-base-0 h-5 w-5" />
    </a>
  );
};
