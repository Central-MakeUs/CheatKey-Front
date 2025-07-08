import CheckBoxOff from "@/assets/icons/checkbox_off.svg?react";
import CheckBoxOn from "@/assets/icons/checkbox_on.svg?react";

import { BottomFullButton } from "../common/BottomFullButton";
import { BottomSheet } from "../common/BottomSheet";

interface TermBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  buttonState: boolean;
  onButtonClick: () => void;
}

export const TermBottomSheet = ({
  isOpen,
  onClose,
  buttonState,
  onButtonClick,
}: TermBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-[1.875rem] px-5">
        <div className="border-b-gray-system-700 flex gap-2.5 border-b py-4">
          <CheckBoxOn className="h-6 w-6" />
          <p className="head-4-semibold text-base-0">전체 동의</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2.5">
            <CheckBoxOn className="h-6 w-6" />
            <p className="body-2-medium text-base-0">
              서비스 이용약관 동의 (필수)
            </p>
          </div>
          <div className="flex gap-2.5">
            <CheckBoxOff className="h-6 w-6" />
            <p className="body-2-medium text-base-0">
              개인정보 수집 및 이용 동의서 (필수)
            </p>
          </div>
          <div className="flex gap-2.5">
            <CheckBoxOff className="h-6 w-6" />
            <p className="body-2-medium text-base-0">
              광고성 정보 내용 수신 동의 (선택)
            </p>
          </div>
        </div>
        <div className="py-3">
          <BottomFullButton
            state={buttonState}
            onClick={onButtonClick}
            content="가입하기"
          />
        </div>
      </div>
    </BottomSheet>
  );
};
