import { useState, useEffect } from "react";

import { BottomSheet } from "@/components/common/BottomSheet";

import { REPORT_REASONS } from "@/constants/reportReasons";

import CheckboxOffIcon from "@/assets/icons/checkbox_off.svg?react";
import CheckboxOnIcon from "@/assets/icons/checkbox_on.svg?react";

import { BottomFullButton } from "./BottomFullButton";

interface ReportPostSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onReportComplete: () => void;
}

export const ReportPostSheet = ({
  isOpen,
  onClose,
  onReportComplete,
}: ReportPostSheetProps) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleSelect = (reason: string) => {
    setSelectedReason((prev) => (prev === reason ? null : reason));
  };

  const handleReport = () => {
    if (selectedReason) {
      console.log("🚨신고 사유:", selectedReason);
      onClose();
      setTimeout(() => {
        onReportComplete();
      }, 100);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedReason(null);
    }
  }, [isOpen]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="mx-5 mb-3 flex flex-col gap-5 text-center">
        <h2 className="text-gray-system-100 head-3-bold my-3">신고하기</h2>
        <div>
          <p className="text-gray-system-200 head-4-semibold mb-1">
            신고 사유를 알려주세요.
          </p>
          <p className="text-gray-system-500 caption-2-regular">
            사용자의 허위 신고 발견 시 사용이 제한될 수 있습니다.
          </p>
        </div>

        <div className="mb-[22px] flex flex-col gap-[10px]">
          {/* TODO: @tifsy 컴포넌트로 분리  */}
          {REPORT_REASONS.map((reason) => (
            <button
              key={reason}
              onClick={() => handleSelect(reason)}
              className={`bg-base-50 flex h-15 w-full items-center justify-between rounded-xl px-5 ${selectedReason === reason ? "border-primary-500 bg-primary-0 border" : ""}`}
            >
              <span
                className={`body-2-medium text-gray-system-200 ${
                  selectedReason === reason ? "text-primary-200" : ""
                }`}
              >
                {reason}
              </span>
              {selectedReason === reason ? (
                <CheckboxOnIcon />
              ) : (
                <CheckboxOffIcon />
              )}
            </button>
          ))}
        </div>

        <BottomFullButton
          state={!!selectedReason}
          onClick={handleReport}
          content="신고하기"
        />
      </div>
    </BottomSheet>
  );
};
