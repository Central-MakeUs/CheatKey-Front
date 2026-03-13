import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCommunityPosts } from "@/apis/community/getCommunityPosts";
import { useBlockPostMutation } from "@/hooks/mutations/useBlockPostMutation";
import { useMenu } from "@/hooks/useMenu";

import { LoadingSpinner } from "@/components/animation/LoadingSpinner";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomSheet } from "@/components/common/BottomSheet";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { ReportSheet } from "@/components/common/ReportSheet";
import { SearchBarRedirect } from "@/components/common/SearchBarRedirect";
import { SelectBox } from "@/components/common/SelectBox";
import { ToTop } from "@/components/common/ToTop";
import { CommunityFeedSortOptionDropdown } from "@/components/communityFeed/CommunityFeedSortOptionDropdown";
import { CommunityFeedTab } from "@/components/communityFeed/CommunityFeedTab";
import { CommunityPostPreview } from "@/components/communityFeed/CommunityPostPreview";

import { QUERY_KEYS } from "@/constants/api/apiConstants";
import { BOARD_CATEGORY_MAP } from "@/constants/community/communityFeedTabs";
import { PAGE_PATH } from "@/constants/route/path";

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

  const { data, isLoading } = useQuery({
    queryKey: communityPostsQueryKey,
    queryFn: () =>
      getCommunityPosts({
        keyword: "",
        category: categoryToKeyword(selectedCategory),
        sort: sortToParam(selectedSortOption),
        page: 1,
        size: 20,
      }),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const {
    menuState,
    openPostMenu,
    openBlockPostConfirm,
    openReportPostSheet,
    showReportComplete,
    close,
  } = useMenu();

  const { mutate: blockPost } = useBlockPostMutation({
    queryKeyToInvalidate: [communityPostsQueryKey],
  });

  const handleBlockPostConfirm = () => {
    if (menuState.id) {
      blockPost({ postId: menuState.id });
    }
    close();
  };

  return (
    <>
      <AppHeader
        title="커뮤니티"
        onWrite={() => navigate(PAGE_PATH.COMMUNITY.SPECIFIC.WRITE)}
        onNotification={() => console.log("🚨알림 클릭됨")}
        className="bg-bg-100"
      />
      <div className="pt-header flex flex-1 flex-col overflow-y-auto px-5 pb-20">
        <SearchBarRedirect placeholder="사기 사례를 검색해주세요." />
        <CommunityFeedTab
          activeTab={selectedCategory}
          setActiveTab={setSelectedCategory}
        />
        <CommunityFeedSortOptionDropdown
          selectedSortOption={selectedSortOption}
          onSelect={setSelectedSortOption}
        />

        {isLoading && <LoadingSpinner width={16} height={16} />}

        {!isLoading && data && (
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
                  onClick={() => navigate(PAGE_PATH.COMMUNITY.SPECIFIC.WRITE)}
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
                    onOpenMenu={openPostMenu}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <ToTop scrollContainerRef={scrollRef} />
      <BottomSheet isOpen={menuState.type === "postMenu"} onClose={close}>
        <div className="mx-5 my-[1.875rem] flex flex-col gap-2.5">
          <SelectBox
            type="menu"
            label="해당 유저 차단하기"
            onClick={() => openBlockPostConfirm(menuState.id!)}
          />
          <SelectBox
            type="menu"
            label="신고하기"
            onClick={() => openReportPostSheet(menuState.id!)}
          />
        </div>
      </BottomSheet>

      {menuState.type === "blockPost" && (
        <ConfirmModal
          title="해당 유저를 차단하시겠어요?"
          description={`차단 시, 이 유저의 게시물을\n더 이상 볼 수 없습니다.`}
          confirmText="차단하기"
          cancelText="취소"
          onConfirm={handleBlockPostConfirm}
          onCancel={close}
        />
      )}

      <ReportSheet
        isOpen={menuState.type === "reportPost"}
        id={menuState.id!}
        reportType={menuState.type}
        queryKeyToInvalidate={[communityPostsQueryKey]}
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
    </>
  );
};
