import { useState } from "react";

import { BottomSheet } from "@/components/common/BottomSheet";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { ReportPostSheet } from "@/components/common/ReportPostSheet";
import { SelectBox } from "@/components/common/SelectBox";

import CommunityPostMenuIcon from "@/assets/icons/community_post_menu.svg?react";

type ViewState = "closed" | "menu" | "block" | "report" | "reportComplete";

export const PostMenuButton = () => {
  const [viewState, setViewState] = useState<ViewState>("closed");

  return (
    <>
      <button
        aria-label="커뮤니티 글 메뉴 열기"
        onClick={() => setViewState("menu")}
      >
        <CommunityPostMenuIcon className="text-gray-system-500 h-6 w-6" />
      </button>

      <BottomSheet
        isOpen={viewState === "menu"}
        onClose={() => setViewState("closed")}
      >
        <div className="mx-5 my-[1.875rem] flex flex-col gap-2.5">
          <SelectBox
            type="postMenu"
            label="해당 유저 차단하기"
            onClick={() => setViewState("block")}
          />
          <SelectBox
            type="postMenu"
            label="신고하기"
            onClick={() => setViewState("report")}
          />
        </div>
      </BottomSheet>

      {viewState === "block" && (
        <ConfirmModal
          title="해당 유저를 차단하시겠어요?"
          description={`차단 시, 이 유저의 게시물을\n더 이상 볼 수 없습니다.`}
          confirmText="차단하기"
          cancelText="취소"
          onConfirm={() => {
            console.log("✅유저 차단 완료");
            setViewState("closed");
          }}
          onCancel={() => setViewState("closed")}
        />
      )}

      {viewState === "reportComplete" && (
        <ConfirmModal
          title="신고가 정상적으로 접수되었습니다."
          description={`접수해주신 내용을 바탕으로\n신속하고 정확하게 검토하겠습니다.`}
          onConfirm={() => setViewState("closed")}
        />
      )}
      <ReportPostSheet
        isOpen={viewState === "report"}
        onClose={() => setViewState("closed")}
        onReportComplete={() => setViewState("reportComplete")}
      />
    </>
  );
};
