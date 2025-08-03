import type { TradeItemCode } from "@/types/signup/signup.types";
import { cn } from "@/utils/cn";

interface ItemFormProps {
  selectedItems: string[];
  setItems: (value: string[]) => void;
  itemOptions: TradeItemCode[];
}

export const ItemForm = ({
  selectedItems,
  setItems,
  itemOptions,
}: ItemFormProps) => {
  const handleSelect = (selectedOptionCode: string) => {
    if (selectedItems.includes(selectedOptionCode)) {
      setItems(selectedItems.filter((code) => code !== selectedOptionCode));
    } else {
      setItems([...selectedItems, selectedOptionCode]);
    }
  };
  return (
    <>
      <h1 id="item-form-title" className="head-3-bold text-base-0">
        자주 거래하는 품목을 알려주세요.
      </h1>
      <h2 className="body-5-regular text-gray-system-600 pt-2.5">
        관심사를 참고하여 사기 예방법을 알려드릴게요.
      </h2>

      <div
        role="group"
        aria-labelledby="item-form-title"
        className="grid grid-cols-3 grid-rows-3 gap-3 pt-[3.25rem]"
      >
        {itemOptions.map((option) => (
          <ItemSelect
            key={option.code}
            itemOption={option}
            isSelected={selectedItems.includes(option.code)}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </>
  );
};

interface ItemSelectProps {
  itemOption: TradeItemCode;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

const ItemSelect = ({ itemOption, isSelected, onSelect }: ItemSelectProps) => {
  const imageUrl = isSelected
    ? itemOption.imageUrl
    : itemOption.disabledImageUrl;

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(itemOption.code)}
      className={cn(
        "body-2-medium flex aspect-square flex-col items-center justify-center gap-2 rounded-xl",
        {
          "text-primary-200 border-primary-400 border bg-[#2f47bd4d]":
            isSelected,
          "bg-base-50 text-gray-system-600 border-gray-system-700 border-[0.5px]":
            !isSelected,
        },
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={itemOption.name}
          className="h-[3.375rem] w-[3.375rem]"
        />
      ) : (
        <div
          role="img"
          aria-label={`${itemOption.name} 아이콘`}
          className="bg-base-0 h-[3.375rem] w-[3.375rem]"
        />
      )}
      <p>{itemOption.name}</p>
    </button>
  );
};
