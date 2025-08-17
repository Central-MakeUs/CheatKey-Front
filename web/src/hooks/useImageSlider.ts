import { useState } from "react";

export const useImageSlider = () => {
  const [sliderState, setSliderState] = useState<{
    images: string[];
    initialIndex: number;
  } | null>(null);

  const openImageSlider = (images: string[], initialIndex: number) => {
    setSliderState({ images, initialIndex });
  };

  const closeImageSlider = () => {
    setSliderState(null);
  };

  return {
    isSliderOpen: sliderState !== null,
    sliderImages: sliderState?.images ?? [],
    initialIndex: sliderState?.initialIndex ?? 0,
    openImageSlider,
    closeImageSlider,
  };
};
