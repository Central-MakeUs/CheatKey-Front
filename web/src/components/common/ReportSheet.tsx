import { useState, useEffect } from "react";

import type { QueryKey } from "@tanstack/react-query";

import { useReportCommentMutation } from "@/hooks/mutations/useReportCommentMutation";
import { useReportPostMutation } from "@/hooks/mutations/useReportPostMutation";
import type { MenuType } from "@/hooks/useMenu";

import { BottomFullButton } from "@/components/common/BottomFullButton";
import { BottomSheet } from "@/components/common/BottomSheet";
import { SelectBox } from "@/components/common/SelectBox";

import {
  REPORT_REASON_MAP,
  REPORT_REASONS,
  type ReportType,
} from "@/constants/reportReasons";

interface ReportSheetProps {
  id: number;
  isOpen: boolean;
  reportType: MenuType;
  queryKeyToInvalidate: QueryKey[];
  onClose: () => void;
  onReportComplete: () => void;
}

export const ReportSheet = ({
  id,
  isOpen,
  reportType,
  queryKeyToInvalidate,
  onClose,
  onReportComplete,
}: ReportSheetProps) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const { mutate: postReport, isPending: isReportingPost } =
    useReportPostMutation({
      queryKeyToInvalidate: queryKeyToInvalidate,
      onSuccess: () => {
        onClose();
        setTimeout(() => {
          onReportComplete();
        }, 100);
      },
    });

  const { mutate: commentReport, isPending: isReportingComment } =
    useReportCommentMutation({
      queryKeyToInvalidate: queryKeyToInvalidate,
      onSuccess: () => {
        onClose();
        setTimeout(() => {
          onReportComplete();
        }, 100);
      },
    });

  const handleSelect = (reason: string) => {
    setSelectedReason((prev) => (prev === reason ? null : reason));
  };

  const handleReport = () => {
    if (selectedReason) {
      const reasonCode = REPORT_REASON_MAP[selectedReason] as ReportType;
      if (!reasonCode) {
        // TODO: 에러 디자인 나오면 변경
        alert("유효하지 않은 신고 사유입니다.");
        return;
      }

      if (reportType === "reportPost") {
        postReport({ postId: id, reasonCode });
      } else if (reportType === "reportComment") {
        commentReport({ commentId: id, reasonCode });
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedReason(null);
    }
  }, [isOpen]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex max-h-[85vh] flex-col gap-5 overflow-y-auto pb-10 text-center">
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
            state={!!selectedReason || isReportingPost || isReportingComment}
            onClick={handleReport}
            content={
              isReportingPost || isReportingComment ? "신고 중.." : "신고하기"
            }
            className="mt-5"
          />
        </div>
      </div>
    </BottomSheet>
  );
};
