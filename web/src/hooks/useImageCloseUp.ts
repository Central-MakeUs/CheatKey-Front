import { useState } from "react";

export const useImageCloseUp = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageCloseUp = (url: string) => setSelectedImage(url);
  const closeImageCloseUp = () => setSelectedImage(null);

  return {
    selectedImage,
    openImageCloseUp,
    closeImageCloseUp,
  };
};
