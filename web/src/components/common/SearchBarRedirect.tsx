import { useNavigate } from "react-router-dom";

import SearchIcon from "@/assets/icons/search.svg?react";

interface SearchBarRedirectProps {
  placeholder: string;
}

const SearchBarRedirect = ({ placeholder }: SearchBarRedirectProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search");
  };

  return (
    <div
      role="button"
      className="bg-base-75 my-[0.625rem] flex h-[2.625rem] w-auto cursor-pointer items-center gap-1 rounded-full pl-3"
      onClick={handleClick}
    >
      <SearchIcon className="text-gray-system-700 h-5 w-5" aria-hidden />
      <span className="text-gray-system-400 body-2-regular">{placeholder}</span>
    </div>
  );
};

export default SearchBarRedirect;
