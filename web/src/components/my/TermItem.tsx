//리뷰

interface TermItemProps {
  title: string;
  content: string;
}

export const TermItem = ({ title, content }: TermItemProps) => {
  return (
    <div
      aria-labelledby="term"
      className="flex flex-col gap-5 overflow-y-auto px-5 py-[1.5625rem]"
    >
      <h2 id="term-title" className="head-2-semibold text-base-0">
        {title}
      </h2>
      <p className="body-5-regular text-gray-system-300 whitespace-pre-line">
        {content}
      </p>
    </div>
  );
};
