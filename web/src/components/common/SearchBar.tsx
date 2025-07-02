import SearchIcon from "@/assets/icons/search.svg";

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => {
  return (
    <div
      className={`bg-bg-50 mx-5 my-[10px] flex h-[42px] w-auto items-center gap-1 rounded-full pl-3`}
    >
      <img src={SearchIcon} alt="검색창" className="h-5 w-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="caret-primary-400 placeholder-gray-system-600 text-gray-system-400 body-2-regular w-full bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
