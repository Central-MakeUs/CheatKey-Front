import type { Gender } from "@/types/signup/signup.types";
import CheckOn from "@/assets/icons/check_on.svg?react";
import CheckOff from "@/assets/icons/check_off.svg?react";
import { cn } from "@/utils/cn";

const GENDER_OPTIONS: Gender[] = ["남자", "여자"];

interface GenderFormProps {
  gender: Gender;
  setGender: (value: Gender) => void;
}

export const GenderForm = ({ gender, setGender }: GenderFormProps) => {
  return (
    <>
      <h1 className="head-3-bold text-base-0">회원님의 성별을 알려주세요.</h1>
      <div className="flex gap-2 pt-8">
        {GENDER_OPTIONS.map((option) => (
          <GenderSelect
            key={option}
            genderOption={option}
            selectedGender={gender}
            onSelect={setGender}
          />
        ))}
      </div>
    </>
  );
};

interface GenderSelectProps {
  genderOption: Gender;
  selectedGender: Gender;
  onSelect: (value: Gender) => void;
}

const GenderSelect = ({
  genderOption,
  selectedGender,
  onSelect,
}: GenderSelectProps) => {
  const isSelected = genderOption === selectedGender;

  return (
    <button
      type="button"
      onClick={() => onSelect(genderOption)}
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
      <p>{genderOption}</p>
      {isSelected ? (
        <CheckOn className="h-6 w-6" />
      ) : (
        <CheckOff className="h-6 w-6" />
      )}
    </button>
  );
};
