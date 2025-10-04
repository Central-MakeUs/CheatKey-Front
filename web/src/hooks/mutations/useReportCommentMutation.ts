import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { postReportComment } from "@/apis/community/postReportComment";

interface UseReportCommentMutationOptions {
  queryKeyToInvalidate: QueryKey;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useReportCommentMutation = ({
  queryKeyToInvalidate,
  onSuccess,
  onError,
}: UseReportCommentMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReportComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
      onSuccess?.();
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 400) {
        alert("이미 신고한 댓글이거나 본인은 신고할 수 없습니다.");
      } else {
        alert("사용자 신고에 실패하였습니다. 잠시 후 다시 시도해주세요.");
      }
      onError?.(error);
    },
  });
};
