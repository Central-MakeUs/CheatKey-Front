import { useRef, useEffect } from "react";

import type { UploadedImage } from "@/types/community/community.types";

import {
  COMMUNITY_WRITE_LIMIT,
  COMMUNITY_ERROR_MESSAGE,
} from "@/constants/communityWriteConstants";

import { cn } from "@/lib/cn";
import { imageFileSchema, imagesSchema } from "@/lib/zod/communityWriteSchema";

import AddIcon from "@/assets/icons/add.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";

interface PostImageUploaderProps {
  value: UploadedImage[];
  onChange: (value: UploadedImage[]) => void;
  showToast: (message: string) => void;
}

export const PostImageUploader = ({
  value,
  onChange,
  showToast,
}: PostImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const validFilesToAdd: UploadedImage[] = [];
    let oversizedFilesFound = false;

    for (const file of Array.from(files)) {
      const newImage: UploadedImage = {
        file,
        previewUrl: URL.createObjectURL(file),
      };

      const result = imageFileSchema.safeParse(newImage);
      if (result.success) {
        validFilesToAdd.push(result.data);
      } else {
        oversizedFilesFound = true;
        URL.revokeObjectURL(newImage.previewUrl);
      }
    }

    if (oversizedFilesFound) {
      showToast(
        COMMUNITY_ERROR_MESSAGE.IMAGE_TOO_LARGE(
          COMMUNITY_WRITE_LIMIT.MAX_IMAGE_SIZE_MB,
        ),
      );
    }

    if (validFilesToAdd.length === 0) {
      if (event.target) event.target.value = "";
      return;
    }

    const combinedImages = [...value, ...validFilesToAdd];
    const arrayResult = imagesSchema.safeParse(combinedImages);

    if (arrayResult.success) {
      onChange(arrayResult.data);
    } else {
      const maxCountError = arrayResult.error.issues.find(
        (issue) => issue.code === "too_big",
      );
      if (maxCountError) {
        showToast(maxCountError.message);
      }

      onChange(combinedImages.slice(0, COMMUNITY_WRITE_LIMIT.MAX_IMAGE_COUNT));
    }

    if (event.target) {
      event.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const imageToRemove = value[indexToRemove];
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    const updatedImages = value.filter((_, index) => index !== indexToRemove);
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
        accept="image/png, image/jpeg"
        multiple
        hidden
        onChange={handleChange}
      />
    </div>
  );
};
