import { useState, useEffect } from "react";

import { BottomFullButton } from "@/components/common/BottomFullButton";
import { BottomSheet } from "@/components/common/BottomSheet";
import { SelectBox } from "@/components/common/SelectBox";

import { REPORT_REASONS } from "@/constants/reportReasons";

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
      <div className="mb-3 flex flex-col gap-5 text-center">
        <h2 className="text-gray-system-100 head-3-bold my-3">신고하기</h2>
        <div>
          <p className="text-gray-system-200 head-4-semibold mb-1">
            신고 사유를 알려주세요.
          </p>
          <p className="text-gray-system-500 caption-2-regular">
            사용자의 허위 신고 발견 시 사용이 제한될 수 있습니다.
          </p>
        </div>
        <div className="bg-base-50 my-2 h-[1px]" />

        <div className="mx-5 flex flex-col gap-3">
          {REPORT_REASONS.map((reason) => (
            <SelectBox
              key={reason}
              type="reportSheet"
              label={reason}
              onClick={() => handleSelect(reason)}
              isSelected={selectedReason === reason}
            />
          ))}
          <BottomFullButton
            state={!!selectedReason}
            onClick={handleReport}
            content="신고하기"
            className="mt-5"
          />
        </div>
      </div>
    </BottomSheet>
  );
};
