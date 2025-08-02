import { SelectBox } from "@/components/common/SelectBox";

interface AgeOption {
  code: string;
  name: string;
}

interface AgeFormProps {
  ageCode: string | null;
  setAgeCode: (value: string) => void;
  ageOptions: AgeOption[];
}

export const AgeForm = ({ ageCode, setAgeCode, ageOptions }: AgeFormProps) => {
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
        {ageOptions.map((option) => (
          <AgeSelect
            key={option.code}
            ageOption={option}
            selectedAgeCode={ageCode}
            onSelect={setAgeCode}
          />
        ))}
      </div>
    </>
  );
};

interface AgeSelectProps {
  ageOption: AgeOption;
  selectedAgeCode: string | null;
  onSelect: (value: string) => void;
}

const AgeSelect = ({
  ageOption,
  selectedAgeCode,
  onSelect,
}: AgeSelectProps) => {
  const isSelected = ageOption.code === selectedAgeCode;

  return (
    <>
      <SelectBox
        type="onboarding"
        label={ageOption.name}
        isSelected={isSelected}
        onClick={() => onSelect(ageOption.code)}
      />
    </>
  );
};
