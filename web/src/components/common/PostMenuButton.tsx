import { useState } from "react";

import { BottomSheet } from "@/components/common/BottomSheet";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { ReportPostSheet } from "@/components/common/ReportPostSheet";

import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";
import CommunityPostMenuIcon from "@/assets/icons/community_post_menu.svg?react";

export const PostMenuButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [isReportPostModalOpen, setIsReportPostModalOpen] = useState(false);

  const handleBlockClick = () => {
    setMenuOpen(false);
    setBlockOpen(true);
  };

  const handleReportClick = () => {
    setMenuOpen(false);
    setReportOpen(true);
  };

  return (
    <>
      <button
        aria-label="커뮤니티 글 메뉴 열기"
        onClick={() => setMenuOpen(true)}
      >
        <CommunityPostMenuIcon className="text-gray-system-500 h-6 w-6" />
      </button>

      <BottomSheet isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="mx-5 my-[30px] flex flex-col gap-[10px]">
          {/* TODO: @tifsy 컴포넌트로 분리  */}
          <button
            className="bg-base-50 flex h-15 w-full items-center justify-between rounded-xl px-5"
            onClick={handleBlockClick}
          >
            <p className="body-2-medium text-gray-system-200">
              해당 유저 차단하기
            </p>
            <ArrowRightIcon />
          </button>
          <button
            className="bg-base-50 flex h-15 w-full items-center justify-between rounded-xl px-5"
            onClick={handleReportClick}
          >
            <p className="body-2-medium text-gray-system-200">신고하기</p>
            <ArrowRightIcon />
          </button>
        </div>
      </BottomSheet>

      {blockOpen && (
        <ConfirmModal
          title="해당 유저를 차단하시겠어요?"
          description={`차단 시, 이 유저의 게시물을\n더 이상 볼 수 없습니다.`}
          confirmText="차단하기"
          cancelText="취소"
          onConfirm={() => {
            console.log("✅유저 차단 완료");
            setBlockOpen(false);
          }}
          onCancel={() => setBlockOpen(false)}
        />
      )}

      {isReportPostModalOpen && (
        <ConfirmModal
          title="신고가 정상적으로 접수되었습니다."
          description={`접수해주신 내용을 바탕으로\n신속하고 정확하게 검토하겠습니다.`}
          onConfirm={() => setIsReportPostModalOpen(false)}
        />
      )}
      <ReportPostSheet
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        onReportComplete={() => setIsReportPostModalOpen(true)}
      />
    </>
  );
};
