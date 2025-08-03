import { useRef, useEffect } from "react";

import type { UploadedImage } from "@/types/community/community.types";
import { cn } from "@/utils/cn";

import AddIcon from "@/assets/icons/add.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";

export const PostImageUploader = ({
  value,
  onChange,
}: {
  value: UploadedImage[];
  onChange: (value: UploadedImage[]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files).slice(0, 5 - value.length);

    const previews = fileArray.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    onChange([...value, ...previews]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = value.filter((_, index) => index !== indexToRemove);
    URL.revokeObjectURL(value[indexToRemove].previewUrl);
    onChange(updatedImages);
  };

  useEffect(() => {
    return () => {
      value.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-[3px] pb-3">
        <h1 className="head-4-semibold text-base-0">사진을 등록해주세요.</h1>
        <span className="body-4-medium text-gray-system-400">
          최대 5장까지 가능해요.
        </span>
      </div>

      <div className="scrollbar-hide mt-2 flex gap-2 overflow-x-auto">
        {value.length < 5 && (
          <button
            type="button"
            onClick={handleClick}
            className={cn(
              "flex h-[6.25rem] w-[6.25rem] shrink-0 items-center justify-center rounded-lg",
              "bg-gray-system-800 border-gray-system-700 border-[0.5px]",
            )}
          >
            <AddIcon className="text-gray-system-600 h-6 w-6 rotate-45" />
          </button>
        )}

        {value.map((item, index) => (
          <div
            key={item.previewUrl}
            className="relative h-[6.25rem] w-[6.25rem] shrink-0"
          >
            <img
              src={item.previewUrl}
              alt={`미리보기 이미지 ${index + 1}`}
              className="border-gray-system-700 h-full w-full rounded-lg border object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-[0.5rem] right-[0.5rem]"
              aria-label={`미리보기 이미지 ${index + 1} 삭제`}
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleChange}
      />
    </div>
  );
};
