import { useRef } from "react";

import type { UploadedImage } from "@/types/communityWrite/communityWrite.types";
import { cn } from "@/utils/cn";

import AddIcon from "@/assets/icons/add.svg?react";

export const PostImageUploader = ({
  value,
  onChange,
}: {
  value: UploadedImage[];
  onChange: (val: UploadedImage[]) => void;
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
              "flex h-[102px] w-[100px] shrink-0 items-center justify-center rounded-[8px]",
              "bg-gray-system-800 border-gray-system-700 border-[0.5px]",
            )}
          >
            <AddIcon className="h-6 w-6 rotate-45" />
          </button>
        )}

        {value.map((item) => (
          <img
            key={item.previewUrl}
            src={item.previewUrl}
            alt="preview"
            className="border-gray-system-700 h-[102px] w-[100px] shrink-0 rounded-[8px] border object-cover"
          />
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
