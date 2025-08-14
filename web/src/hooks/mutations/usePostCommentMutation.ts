import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postComment } from "@/apis/comment/postComment";

import { QUERY_KEYS } from "@/constants/apiConstants";

export const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENT_LIST],
      });

      console.log("댓글 추가 성공");
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
