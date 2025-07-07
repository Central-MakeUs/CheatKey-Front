import SearchIcon from "@/assets/icons/search.svg?react";

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchBar = ({ placeholder, value = "", onChange }: SearchBarProps) => {
  const isSearchBarFilled = value.trim().length > 0;

  return (
    <div className="bg-base-75 my-[10px] flex h-[42px] w-auto items-center gap-1 rounded-full pl-3">
      <SearchIcon className="text-gray-system-600 h-5 w-5" aria-hidden />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`caret-primary-400 placeholder-gray-system-600 w-full bg-transparent focus:outline-none ${
          isSearchBarFilled
            ? "text-gray-system-200 body-1-medium"
            : "text-gray-system-400 body-2-regular"
        }`}
      />
    </div>
  );
};

export default SearchBar;
