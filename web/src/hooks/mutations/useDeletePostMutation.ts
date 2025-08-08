import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "@/apis/community/deletePost";

import { QUERY_KEYS } from "@/constants/apiConstants";

export const useDeletePostMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    // 케이스 별로 다르게 쿼리 클라이언트 초기화 시킬 예정
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MYPAGE_POST] });
    },
    // 추후, 토스트 구현?
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
    },
  });
};
