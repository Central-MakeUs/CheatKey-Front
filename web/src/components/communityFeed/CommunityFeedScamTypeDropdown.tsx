import { useState, useRef, useEffect } from "react";

import DropDownIcon from "@/assets/icons/dropdown.svg";

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
      className="relative flex w-full justify-end pt-[14px]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-system-600 body-1-bold flex h-[42px] w-25 items-center justify-end gap-[1px]"
      >
        사기 유형
        <img src={DropDownIcon} alt="드롭다운 아이콘" />
      </button>

      {isOpen && (
        <ul className="bg-bg-50 caption-1-medium absolute z-10 mt-11 w-25 overflow-hidden rounded-lg">
          {SCAM_TYPES.map((type) => {
            const isSelected = selectedScamType === type;

            return (
              <li
                key={type}
                onClick={() => {
                  onSelect(type);
                  setIsOpen(false);
                }}
                className={`h-[38px] cursor-pointer p-[10px] ${
                  isSelected
                    ? "bg-gray-system-800 text-gray-system-400"
                    : "text-gray-system-600"
                }`}
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
