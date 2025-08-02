import type { TradeMethodCode } from "@/types/signup/signup.types";

import { SelectBox } from "@/components/common/SelectBox";

interface MethodFormProps {
  selectedMethods: string[];
  setMethods: (value: string[]) => void;
  methodOptions: TradeMethodCode[];
}

export const MethodForm = ({
  selectedMethods,
  setMethods,
  methodOptions,
}: MethodFormProps) => {
  const handleSelect = (selectedOptionCode: string) => {
    if (selectedMethods.includes(selectedOptionCode)) {
      setMethods(selectedMethods.filter((code) => code !== selectedOptionCode));
    } else {
      setMethods([...selectedMethods, selectedOptionCode]);
    }
  };

  return (
    <>
      <h1 className="head-3-bold text-base-0">
        자주 쓰시는 거래 방식을 알려주세요.
      </h1>
      <h2 className="body-5-regular text-gray-system-600 pt-2.5">
        거래 유형을 참고하여 사기 방식을 안내해드릴게요.
      </h2>

      <div className="flex flex-col gap-3 pt-[2.875rem]">
        {methodOptions.map((option) => (
          <MethodSelect
            key={option.code}
            methodOption={option}
            isSelected={selectedMethods.includes(option.code)}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </>
  );
};

interface MethodSelectProps {
  methodOption: TradeMethodCode;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

const MethodSelect = ({
  methodOption,
  isSelected,
  onSelect,
}: MethodSelectProps) => {
  return (
    <SelectBox
      type="onboarding"
      label={methodOption.name}
      isSelected={isSelected}
      onClick={() => onSelect(methodOption.code)}
    />
  );
};
