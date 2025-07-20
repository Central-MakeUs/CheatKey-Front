import { cn } from "@/utils/cn";

import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";
import CheckOffIcon from "@/assets/icons/check_off.svg?react";
import CheckOnIcon from "@/assets/icons/check_on.svg?react";
import CheckboxOffIcon from "@/assets/icons/checkbox_off.svg?react";
import CheckboxOnIcon from "@/assets/icons/checkbox_on.svg?react";

type SelectBoxType = "onboarding" | "postMenu" | "reportSheet";

interface SelectBoxProps {
  type: SelectBoxType;
  label: string | null;
  onClick?: () => void;
  isSelected?: boolean;
}
const SELECT_BOX_CONFIG: Record<
  SelectBoxType,
  {
    default: string;
    selected?: string;
    icon: (isSelected: boolean) => React.ReactNode;
  }
> = {
  onboarding: {
    default:
      "bg-[#2C2D3066] text-gray-system-600 border-[0.5px] border-gray-system-700",
    selected:
      "bg-primary-0 text-primary-200 border-blue-300 border-[1px] border-primary-400",
    icon: (isSelected) => (isSelected ? <CheckOnIcon /> : <CheckOffIcon />),
  },
  postMenu: {
    default: "bg-base-50 text-gray-system-200",
    icon: () => <ArrowRightIcon />,
  },
  reportSheet: {
    default:
      "bg-base-50 text-gray-system-400  border-[0.5px] border-gray-system-700",
    selected:
      "bg-primary-0 text-primary-200 border-blue-300 border border-primary-400",
    icon: (isSelected) =>
      isSelected ? <CheckboxOnIcon /> : <CheckboxOffIcon />,
  },
};

export const SelectBox = ({
  type,
  label,
  onClick,
  isSelected = false,
}: SelectBoxProps) => {
  const {
    default: defaultStyle,
    selected: selectedStyle,
    icon,
  } = SELECT_BOX_CONFIG[type];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-15 w-full items-center justify-between rounded-xl px-5 transition-colors duration-50",
        isSelected ? selectedStyle : defaultStyle,
      )}
    >
      <span className="body-2-medium">{label}</span>
      <span className="h-6 w-6 [&>*]:h-6 [&>*]:w-6">{icon(isSelected)}</span>
    </button>
  );
};
