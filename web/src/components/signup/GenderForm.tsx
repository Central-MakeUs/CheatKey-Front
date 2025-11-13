import type { GenderCode } from "@/types/signup/signup.types";

import { cn } from "@/lib/cn";

import CheckOff from "@/assets/icons/check_off.svg?react";
import CheckOn from "@/assets/icons/check_on.svg?react";

interface GenderFormProps {
  genderCode: string | null;
  setGenderCode: (value: string) => void;
  genderOptions: GenderCode[];
}

export const GenderForm = ({
  genderCode,
  setGenderCode,
  genderOptions,
}: GenderFormProps) => {
  return (
    <>
      <h1 id="gender-group-label" className="head-3-bold text-base-0">
        회원님의 성별을 알려주세요.
      </h1>
      <div
        role="radiogroup"
        aria-labelledby="gender-group-label"
        className="flex gap-2 pt-8"
      >
        {genderOptions.map((option) => (
          <GenderSelect
            key={option.code}
            genderOption={option}
            selectedGender={genderCode}
            onSelect={setGenderCode}
          />
        ))}
      </div>
    </>
  );
};

interface GenderSelectProps {
  genderOption: GenderCode;
  selectedGender: string | null;
  onSelect: (value: string) => void;
}

const GenderSelect = ({
  genderOption,
  selectedGender,
  onSelect,
}: GenderSelectProps) => {
  const isSelected = genderOption.code === selectedGender;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(genderOption.code)}
      className={cn(
        "body-2-medium flex w-full items-center justify-between rounded-xl px-5 py-[1.6875rem] text-left",
        {
          "text-primary-200 border-primary-400 border bg-[#2f47bd4d]":
            isSelected,
          "bg-base-50 text-gray-system-600 border-gray-system-700 border-[0.5px]":
            !isSelected,
        },
      )}
    >
      <p>{genderOption.name}</p>
      {isSelected ? (
        <CheckOn className="h-6 w-6" />
      ) : (
        <CheckOff className="h-6 w-6" />
      )}
    </button>
  );
};
