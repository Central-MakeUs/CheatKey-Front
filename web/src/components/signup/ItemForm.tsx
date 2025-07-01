import type { ItemCategory } from "@/types/signup/signup.types";
import { cn } from "@/utils/cn";

const ITEM_OPTIONS: ItemCategory[] = [
  "전자제품",
  "가전제품",
  "티켓",
  "패션",
  "명품",
  "임시값_1",
  "임시값_2",
  "임시값_3",
  "임시값_4",
];

interface ItemFormProps {
  items: ItemCategory[];
  setItems: (value: ItemCategory[]) => void;
}

export const ItemForm = ({ items, setItems }: ItemFormProps) => {
  const handleSelect = (selectedOption: ItemCategory) => {
    if (items.includes(selectedOption)) {
      setItems(items.filter((item) => item !== selectedOption));
    } else {
      setItems([...items, selectedOption]);
    }
  };

  return (
    <>
      <h1 className="head-3-bold text-base-0">
        자주 거래하는 품목을 알려주세요.
      </h1>
      <h2 className="body-5-regular text-gray-system-600 pt-2.5">
        관심사를 참고하여 사기 예방법을 알려드릴게요.
      </h2>

      <div className="grid grid-cols-3 grid-rows-3 gap-3 pt-[3.25rem]">
        {ITEM_OPTIONS.map((option) => (
          <ItemSelect
            key={option}
            itemOption={option}
            isSelected={items.includes(option)}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </>
  );
};

interface ItemSelectProps {
  itemOption: ItemCategory;
  isSelected: boolean;
  onSelect: (value: ItemCategory) => void;
}

const ItemSelect = ({ itemOption, isSelected, onSelect }: ItemSelectProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(itemOption)}
      className={cn(
        "body-2-medium flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border",
        {
          "text-primary-200 border-primary-400 bg-[#2f47bd4d]": isSelected,
          "bg-base-50 text-gray-system-600 border-gray-system-700": !isSelected,
        },
      )}
    >
      <img className="bg-base-0 h-[3.375rem] w-[3.375rem]" />
      <p>{itemOption}</p>
    </button>
  );
};
