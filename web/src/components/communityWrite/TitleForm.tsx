import { useState, type ChangeEvent } from "react";

import { cn } from "@/utils/cn";

import CloseButton from "@/assets/icons/close_button.svg?react";

interface TitleFormProps {
  title: string;
  onChange: (value: string) => void;
}

export const TitleForm = ({ title, onChange }: TitleFormProps) => {
  const [isInputFocus, setIsInputFocus] = useState(false);

  return (
    <div>
      <h1 className="head-4-semibold text-base-0 pb-3">
        글 제목을 입력해주세요.
        <span className="text-primary-400">*</span>
      </h1>
      <label htmlFor="titleInput" className="relative h-fit w-full">
        <input
          id="titleInput"
          placeholder="최소 10자 이상 작성해주세요."
          className={cn(
            "body-3-regular w-full border-b p-3 overflow-ellipsis transition-colors outline-none",
            isInputFocus
              ? "border-b-primary-400 text-gray-system-400"
              : "border-b-gray-system-700 text-gray-system-600",
          )}
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        />

        {title.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1/2 right-4 h-[1.375rem] w-[1.375rem] -translate-y-1/2 rounded-full"
          >
            <CloseButton className="h-[1.375rem] w-[1.375rem]" />
          </button>
        )}
      </label>
    </div>
  );
};
