import type { TradeMethod } from "@/types/signup/signup.types";

import { SelectBox } from "@/components/common/SelectBox";

const TRADE_METHOD_OPTIONS: TradeMethod[] = [
  "SNS 거래",
  "중고거래사이트",
  "블로그 거래",
  "중고거래 앱",
  "기타",
];

interface MethodFormProps {
  methods: TradeMethod[];
  setMethods: (value: TradeMethod[]) => void;
}

export const MethodForm = ({ methods, setMethods }: MethodFormProps) => {
  const handleSelect = (selectedOption: TradeMethod) => {
    // 이미 선택된 항목인지 확인
    if (methods.includes(selectedOption)) {
      // 이미 있다면, 해당 항목을 제외한 새 배열을 만듦 (선택 해제)
      setMethods(methods.filter((method) => method !== selectedOption));
    } else {
      // 없다면, 기존 배열에 새 항목을 추가 (선택)
      setMethods([...methods, selectedOption]);
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
        {TRADE_METHOD_OPTIONS.map((option) => (
          <MethodSelect
            key={option}
            methodOption={option}
            isSelected={methods.includes(option)}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </>
  );
};

interface MethodSelectProps {
  methodOption: TradeMethod;
  isSelected: boolean;
  onSelect: (value: TradeMethod) => void;
}

const MethodSelect = ({
  methodOption,
  isSelected,
  onSelect,
}: MethodSelectProps) => {
  return (
    <SelectBox
      type="onboarding"
      label={methodOption}
      isSelected={isSelected}
      onClick={() => onSelect(methodOption)}
    />
  );
};
