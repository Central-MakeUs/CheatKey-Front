import ArrowRight from "@/assets/icons/arrow_right.svg?react";

interface ContentRedirectBannerProps {
  image: string;
  title: string;
  content: string;
  navigate: () => void;
}

export const ContentRedirectBanner = ({
  image,
  title,
  content,
  navigate,
}: ContentRedirectBannerProps) => {
  return (
    <a
      onClick={navigate}
      className="relative flex h-19 w-full cursor-pointer items-center gap-2.5 overflow-hidden rounded-xl bg-[#212738] pr-5 pl-2"
    >
      <img src={image} aria-hidden="true" className="h-15 w-15 shrink-0" />
      <div className="flex w-full flex-col gap-[0.1825rem]">
        <div className="flex w-full items-center justify-between">
          <p className="body-4-medium text-gray-system-100">{title}</p>
          <ArrowRight
            className="text-gray-system-700 h-3.5 w-3.5"
            aria-hidden="true"
          />
        </div>
        <p className="caption-2-regular text-primary-200">{content}</p>
      </div>
    </a>
  );
};
