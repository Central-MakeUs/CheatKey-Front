import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { path } from "@/routes/path";

import { getCommunityPosts } from "@/apis/community/getCommunityPosts";
import { useBlockUserMutation } from "@/hooks/mutations/useBlockUserMutation";
import { usePostMenu } from "@/hooks/usePostMenu";

import { LoadingSpinner } from "@/components/animation/LoadingSpinner";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomSheet } from "@/components/common/BottomSheet";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { ReportPostSheet } from "@/components/common/ReportPostSheet";
import { SearchBarRedirect } from "@/components/common/SearchBarRedirect";
import { SelectBox } from "@/components/common/SelectBox";
import { ToTop } from "@/components/common/ToTop";
import { CommunityFeedSortOptionDropdown } from "@/components/communityFeed/CommunityFeedSortOptionDropdown";
import { CommunityFeedTab } from "@/components/communityFeed/CommunityFeedTab";
import { CommunityPostPreview } from "@/components/communityFeed/CommunityPostPreview";

import { QUERY_KEYS } from "@/constants/apiConstants";
import { BOARD_CATEGORY_MAP } from "@/constants/commnityFeedTabs";

import WriteOff from "@/assets/icons/write_off.svg?react";

const sortToParam = (sort: string): string => {
  return sort === "인기순" ? "popular" : "latest";
};

const categoryToKeyword = (category: string): string => {
  return BOARD_CATEGORY_MAP[category] || "";
};

export const CommunityFeed = () => {
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedSortOption, setSelectedSortOption] = useState("최신순");

  const [selectedCategory, setSelectedCategory] = useState("신고합니다");

  const communityPostsQueryKey = [
    QUERY_KEYS.GET_COMMUNITY_FEED,
    selectedCategory,
    selectedSortOption,
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: communityPostsQueryKey,
    queryFn: () =>
      getCommunityPosts({
        keyword: "",
        category: categoryToKeyword(selectedCategory),
        sort: sortToParam(selectedSortOption),
        page: 1,
        size: 20,
      }),
  });
  const {
    menuState,
    openMenu,
    openBlockConfirm,
    openReportSheet,
    showReportComplete,
    close,
  } = usePostMenu();

  const { mutate: blockUser } = useBlockUserMutation(communityPostsQueryKey);

  const handleBlockConfirm = () => {
    if (menuState.postId) {
      blockUser({ postId: menuState.postId });
    }
    close();
  };

  return (
    <div className="bg-bg-100 safearea flex h-screen flex-col">
      <AppHeader
        title="커뮤니티"
        onWrite={() => navigate(path.community.write)}
        onNotification={() => console.log("🚨알림 클릭됨")}
        className="bg-bg-100"
      />
      <div className="pt-header h-screen overflow-y-auto px-5 pb-20">
        <SearchBarRedirect placeholder="사기 사례를 입력해주세요." />
        <CommunityFeedTab
          activeTab={selectedCategory}
          setActiveTab={setSelectedCategory}
        />
        <CommunityFeedSortOptionDropdown
          selectedSortOption={selectedSortOption}
          onSelect={setSelectedSortOption}
        />
        {/* isError 에러 처리 */}

        {isLoading && <LoadingSpinner width={16} height={16} />}

        {!isLoading && !isError && data && (
          <>
            {data.content.length === 0 ? (
              <div className="flex flex-col items-center">
                <p className="body-2-medium text-gray-system-600 py-[1.75rem] text-center whitespace-pre-line">
                  현재 작성된 글이 존재하지 않아요.
                  <br />
                  새로운 글을 작성해보세요!
                </p>
                <button
                  className="bg-bg-50 body-1-bold text-gray-system-500 flex h-[42px] w-[120px] items-center justify-center gap-[1px] rounded-full"
                  onClick={() => navigate(path.community.write)}
                >
                  <span className="body-1-bold">글 작성하기</span>
                  <WriteOff
                    className="h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                  />
                </button>
              </div>
            ) : (
              <div className="divide-bg-50 divide-y">
                {data.content.map((post) => (
                  <CommunityPostPreview
                    key={post.id}
                    {...post}
                    onOpenMenu={openMenu}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <ToTop scrollContainerRef={scrollRef} />
      <BottomSheet isOpen={menuState.type === "menu"} onClose={close}>
        <div className="mx-5 my-[1.875rem] flex flex-col gap-2.5">
          <SelectBox
            type="postMenu"
            label="해당 유저 차단하기"
            onClick={() => openBlockConfirm(menuState.postId!)}
          />
          <SelectBox
            type="postMenu"
            label="신고하기"
            onClick={() => openReportSheet(menuState.postId!)}
          />
        </div>
      </BottomSheet>

      {menuState.type === "block" && (
        <ConfirmModal
          title="해당 유저를 차단하시겠어요?"
          description={`차단 시, 이 유저의 게시물을\n더 이상 볼 수 없습니다.`}
          confirmText="차단하기"
          cancelText="취소"
          onConfirm={handleBlockConfirm}
          onCancel={close}
        />
      )}

      <ReportPostSheet
        isOpen={menuState.type === "report"}
        postId={menuState.postId!}
        onClose={close}
        onReportComplete={showReportComplete}
      />

      {menuState.type === "reportComplete" && (
        <ConfirmModal
          title="신고가 정상적으로 접수되었습니다."
          description={`접수해주신 내용을 바탕으로\n신속하고 정확하게 검토하겠습니다.`}
          onConfirm={close}
        />
      )}
    </div>
  );
};
