import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/utils/cn";

import DropDownIcon from "@/assets/icons/dropdown.svg?react";

interface CommunityFeedSortOptionDropdownProps {
  selectedSortOption: string;
  onSelect: (category: string) => void;
}

const SORT_OPTIONS = ["최신순", "인기순"];

export const CommunityFeedSortOptionDropdown = ({
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
    <div ref={dropdownRef} className="relative flex w-full justify-end pt-3.5">
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="scam-type-listbox"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-system-600 body-1-bold flex h-[2.625rem] w-25 items-center justify-end gap-0.5"
      >
        {selectedSortOption}
        <DropDownIcon className="ml-1 h-4 w-4" aria-hidden />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: "easeIn",
            }}
            className="bg-bg-50 caption-1-medium absolute top-full z-10 mt-2 w-25 overflow-hidden rounded-lg"
            style={{ transformOrigin: "top" }}
          >
            {SORT_OPTIONS.map((option, index) => {
              const isSelected = selectedSortOption === option;

              return (
                <motion.li
                  key={option}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.15,
                    delay: index * 0.05,
                    ease: "easeIn",
                  }}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  aria-selected={isSelected}
                  className={cn(
                    "h-[2.375rem] cursor-pointer p-2.5 transition-colors duration-150",
                    isSelected
                      ? "bg-base-50 text-gray-system-100"
                      : "bg-bg-50 text-gray-system-500",
                  )}
                >
                  {option}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
