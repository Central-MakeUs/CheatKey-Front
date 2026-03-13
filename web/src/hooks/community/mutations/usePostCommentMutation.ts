import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

import { postComment } from "@/apis/comment/postComment";

export const usePostCommentMutation = (
  queryKeyToInvalidate: QueryKey | QueryKey[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
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
