import { useState } from "react";

import { cn } from "@/utils/cn";

interface ImageWithLoaderProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  rounded?: "md" | "xl";
}

export const ImageWithLoader = ({
  src,
  alt,
  className,
  rounded = "md",
  ...props
}: ImageWithLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-fit w-fit">
      {isLoading && (
        <div
          className={cn(
            "bg-bg-50 absolute inset-0 h-full w-full animate-pulse",
            {
              "rounded-xl": rounded === "xl",
              "rounded-md": rounded === "md",
            },
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full",
          {
            "opacity-0": isLoading,
            "opacity-100 transition-opacity duration-300": !isLoading,
          },
          className,
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
};
