import ArrowRight from "@/assets/icons/arrow_right.svg?react";

interface ContentRedirectBannerProps {
  image: string;
  title: string;
  content: string;
  href: string;
}

export const ContentRedirectBanner = ({
  image,
  title,
  content,
  href,
}: ContentRedirectBannerProps) => {
  return (
    <a
      href={href}
      className="relative flex h-19 w-full items-center gap-2.5 overflow-hidden rounded-xl bg-[#212738] pr-5 pl-2"
    >
      <img src={image} className="h-15 w-15 shrink-0" alt={title} />
      <div className="flex w-full flex-col gap-[0.1825rem]">
        <div className="flex w-full items-center justify-between">
          <h1 className="body-4-medium text-gray-system-100">{title}</h1>
          <ArrowRight className="text-gray-system-700 h-3.5 w-3.5" />
        </div>
        <p className="caption-2-regular text-primary-200">{content}</p>
      </div>
    </a>
  );
};
