import type { Age } from "@/types/signup/signup.types";
import { cn } from "@/utils/cn";

import CheckOff from "@/assets/icons/check_off.svg?react";
import CheckOn from "@/assets/icons/check_on.svg?react";

const AGE_OPTIONS: Age[] = ["10~20대", "30~40대", "50~60대", "60대 이상"];

interface AgeFormProps {
  age: Age;
  setAge: (value: Age) => void;
}

export const AgeForm = ({ age, setAge }: AgeFormProps) => {
  return (
    <>
      <h1 id="age-group-label" className="head-3-bold text-base-0">
        회원님의 나이를 알려주세요.
      </h1>
      <h2 className="body-5-regular text-gray-system-600 pt-2.5">
        나이를 바탕으로 사기 유형을 안내해드릴게요.
      </h2>

      <div
        role="radiogroup"
        aria-labelledby="age-group-label"
        className="flex flex-col gap-3 pt-[2.875rem]"
      >
        {AGE_OPTIONS.map((option) => (
          <AgeSelect
            key={option}
            ageOption={option}
            selectedAge={age}
            onSelect={setAge}
          />
        ))}
      </div>
    </>
  );
};

interface AgeSelectProps {
  ageOption: Age;
  selectedAge: Age | null;
  onSelect: (value: Age) => void;
}

const AgeSelect = ({ ageOption, selectedAge, onSelect }: AgeSelectProps) => {
  const isSelected = ageOption === selectedAge;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(ageOption)}
      className={cn(
        "body-2-medium flex items-center justify-between rounded-xl px-5 py-[1.125rem] text-left",
        {
          /* TODO: @Ki-Tak 추후에 디자인 시스템 변경시 배경화면 팔레트 변경해야함*/
          "text-primary-200 border-primary-400 border bg-[#2f47bd4d]":
            isSelected,
          "bg-base-50 text-gray-system-600 border-gray-system-700 border-[0.5px]":
            !isSelected,
        },
      )}
    >
      <p>{ageOption}</p>
      {isSelected ? (
        <CheckOn className="h-6 w-6" />
      ) : (
        <CheckOff className="h-6 w-6" />
      )}
    </button>
  );
};
