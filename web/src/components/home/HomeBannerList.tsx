import { useEffect, useState } from "react";

import type { HomeBannerData } from "@/types/home/home.types";

interface HomeBannerListProps {
  banners: HomeBannerData[];
}
export const HomeBannerList = ({ banners }: HomeBannerListProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    // 배너가 하나면 타이머 실행 X
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length); // 다음 인덱스
    }, 6000); // 시간

    return () => clearInterval(interval);
  }, [banners.length]);

  // 배너가 없으면 렌더링 X
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative flex h-19 w-full items-center gap-3 overflow-hidden rounded-xl bg-[#212738]">
      {banners.map((banner, index) => (
        <a
          key={`banner-${index}`}
          href={
            `${banner.bannerId}` /* TODO: @Ki-Tak 배너 라우팅 정해지면 변경해야함 */
          }
          className="absolute inset-0 flex items-center gap-3 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(${(index - currentIndex) * 100}%)`,
          }}
        >
          <img
            src={banner.image}
            className="h-19 w-auto shrink-0"
            alt={banner.title}
          />
          <div className="flex flex-col gap-[0.1825rem]">
            <h1 className="body-4-medium text-gray-system-100">
              {banner.title}
            </h1>
            <p className="caption-2-regular text-primary-200">
              {banner.content}
            </p>
          </div>
        </a>
      ))}
      <div className="caption-1-medium text-gray-system-500 bg-base-100/50 shadow-shadow-1 absolute right-[0.6875rem] bottom-[0.4375rem] flex h-6 w-12 items-center rounded-full px-2.5 text-center tracking-[0.25rem]">
        {currentIndex + 1}/{banners.length}
      </div>
    </div>
  );
};
