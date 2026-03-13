import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { postReportPost } from "@/apis/community/postReportPost";

interface UseReportPostMutationOptions {
  queryKeyToInvalidate: QueryKey;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useReportPostMutation = ({
  queryKeyToInvalidate,
  onSuccess,
  onError,
}: UseReportPostMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReportPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
      onSuccess?.();
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 400) {
        alert("이미 신고한 게시글이거나 본인은 신고할 수 없습니다.");
      } else {
        alert("사용자 신고에 실패하였습니다. 잠시 후 다시 시도해주세요.");
      }
      onError?.(error);
    },
  });
};
