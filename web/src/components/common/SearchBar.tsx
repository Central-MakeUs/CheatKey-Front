import { useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

import EraseIcon from "@/assets/icons/erase.svg?react";
import PrevIcon from "@/assets/icons/prev.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ placeholder, value = "", onChange }: SearchBarProps) => {
  const navigate = useNavigate();

  const isSearchBarFilled = value.trim().length > 0;

  return (
    <div className="mb-[0.625rem] flex items-center gap-[5px]">
      <PrevIcon
        className="text-base-0 h-6 w-6"
        onClick={() => navigate(-1)}
        role="button"
      />
      <div className="bg-base-75 flex h-[2.625rem] w-full items-center gap-1 rounded-full px-3">
        <SearchIcon className="text-gray-system-700 h-5 w-5" aria-hidden />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "caret-primary-400 placeholder-gray-system-600 w-full bg-transparent focus:outline-none",
            isSearchBarFilled
              ? "text-gray-system-200 body-1-medium"
              : "text-gray-system-400 body-2-regular",
          )}
          aria-label={placeholder}
        />
        <EraseIcon
          className={cn(
            "cursor-pointer transition-opacity",
            isSearchBarFilled ? "opacity-100" : "opacity-0",
          )}
          onClick={() => onChange("")}
          role="button"
          aria-label="입력 초기화"
        />
      </div>
    </div>
  );
};

export default SearchBar;
