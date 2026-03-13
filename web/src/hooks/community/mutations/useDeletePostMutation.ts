import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

import { deletePost } from "@/apis/community/deletePost";

interface UseDeletePostMutationOptions {
  queryKeyToInvalidate: QueryKey | QueryKey[];
  onSuccess?: () => void;
  onError?: () => void;
}

export const useDeletePostMutation = ({
  queryKeyToInvalidate,
  onSuccess,
  onError,
}: UseDeletePostMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      const keysToInvalidate = Array.isArray(queryKeyToInvalidate[0])
        ? (queryKeyToInvalidate as QueryKey[])
        : ([queryKeyToInvalidate] as QueryKey[]);

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
      onError?.();
    },
  });
};
