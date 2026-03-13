import { useState, useEffect } from "react";

export const useImagePreloader = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const preloadImages = async () => {
      const promises = imageUrls.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        if (!isCancelled) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error("이미지 프리로딩에 실패했습니다.", error);

        if (!isCancelled) {
          setImagesLoaded(true);
        }
      }
    };

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, [imageUrls]);

  return { imagesLoaded };
};
