import { useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

import { useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

import EraseIcon from "@/assets/icons/erase.svg?react";
import PrevIcon from "@/assets/icons/prev.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
  placeholder,
  value = "",
  onChange,
  onKeyDown,
}: SearchBarProps) => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isSearchBarFilled = value.trim().length > 0;

  return (
    <div className="mb-[0.625rem] flex w-full items-center gap-[5px]">
      <button className="text-base-0 h-6 w-6" onClick={() => navigate(-1)}>
        <PrevIcon />
      </button>
      <div className="bg-base-75 flex h-[2.625rem] w-full items-center gap-1 rounded-full px-3">
        <SearchIcon className="text-gray-system-700 h-5 w-5" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onKeyDown={onKeyDown}
          className={cn(
            "caret-primary-400 placeholder-gray-system-600 w-full bg-transparent focus:outline-none",
            isSearchBarFilled
              ? "text-gray-system-200 body-1-medium"
              : "text-gray-system-400 body-2-regular",
          )}
          aria-label={placeholder}
        />
        <button
          className={cn(
            "cursor-pointer transition-opacity",
            isSearchBarFilled ? "opacity-100" : "opacity-0",
          )}
          onClick={() => onChange("")}
          aria-label="입력 초기화"
        >
          <EraseIcon />
        </button>
      </div>
    </div>
  );
};
