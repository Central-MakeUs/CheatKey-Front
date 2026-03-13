import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

import { deleteComment } from "@/apis/comment/deleteComment";

export const useDeleteCommentMutation = (
  queryKeyToInvalidate: QueryKey | QueryKey[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      const keysToInvalidate = Array.isArray(queryKeyToInvalidate[0])
        ? (queryKeyToInvalidate as QueryKey[])
        : ([queryKeyToInvalidate] as QueryKey[]);

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
