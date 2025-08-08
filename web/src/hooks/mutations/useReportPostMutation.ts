import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

import { postReport } from "@/apis/community/postReport";

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
    mutationFn: postReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
      onSuccess?.();
    },
    onError: (error) => {
      alert("사용자 신고에 실패하였습니다");
      onError?.(error);
    },
  });
};
