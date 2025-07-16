import { useState, useRef, useEffect } from "react";

import { cn } from "@/utils/cn";

import DropDownIcon from "@/assets/icons/dropdown.svg?react";

interface CommunityFeedSortOptionDropdownProps {
  selectedSortOption: string;
  onSelect: (category: string) => void;
}

const SORT_OPTIONS = ["최신순", "인기순"];

const CommunityFeedSortOptionDropdown = ({
  selectedSortOption,
  onSelect,
}: CommunityFeedSortOptionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative flex w-full justify-end pt-[0.875rem]"
    >
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="scam-type-listbox"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-system-600 body-1-bold flex h-[2.625rem] w-[6.25rem] items-center justify-end gap-[0.0625rem]"
      >
        {selectedSortOption}
        <DropDownIcon className="ml-1 h-4 w-4" aria-hidden />
      </button>

      {isOpen && (
        <ul className="bg-bg-50 caption-1-medium absolute top-full z-10 mt-[0.5rem] w-[6.25rem] overflow-hidden rounded-lg">
          {SORT_OPTIONS.map((option) => {
            const isSelected = selectedSortOption === option;

            return (
              <li
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                aria-selected={isSelected}
                className={cn(
                  "h-[2.375rem] cursor-pointer p-[0.625rem]",
                  isSelected
                    ? "bg-base-50 text-gray-system-100"
                    : "bg-bg-50 text-gray-system-500",
                )}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CommunityFeedSortOptionDropdown;
