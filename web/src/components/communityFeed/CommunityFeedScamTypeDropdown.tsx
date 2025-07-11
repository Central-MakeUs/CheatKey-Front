import { useState, useRef, useEffect } from "react";

import { cn } from "@/utils/cn";

import DropDownIcon from "@/assets/icons/dropdown.svg?react";

interface CommunityFeedScamTypeDropdownProps {
  selectedScamType: string;
  onSelect: (category: string) => void;
}

const SCAM_TYPES = [
  "전체",
  "스팸",
  "보이스피싱",
  "티켓 거래",
  "거래 카페",
  "SNS 거래",
  "채팅 거래",
];

const CommunityFeedScamTypeDropdown = ({
  selectedScamType,
  onSelect,
}: CommunityFeedScamTypeDropdownProps) => {
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
      className="relative flex w-full justify-end py-[0.875rem]"
    >
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="scam-type-listbox"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-system-600 body-1-bold flex h-[2.625rem] w-[6.25rem] items-center justify-end gap-[0.0625rem]"
      >
        사기 유형
        <DropDownIcon className="ml-1 h-4 w-4" aria-hidden />
      </button>

      {isOpen && (
        <ul className="bg-bg-50 caption-1-medium absolute top-full z-10 mt-[0.5rem] w-[6.25rem] overflow-hidden rounded-lg">
          {SCAM_TYPES.map((type) => {
            const isSelected = selectedScamType === type;

            return (
              <li
                key={type}
                onClick={() => {
                  onSelect(type);
                  setIsOpen(false);
                }}
                aria-selected={isSelected}
                className={cn(
                  "h-[2.375rem] cursor-pointer p-[0.625rem]",
                  isSelected
                    ? "bg-gray-system-800 text-gray-system-400"
                    : "text-gray-system-600",
                )}
              >
                {type}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CommunityFeedScamTypeDropdown;
