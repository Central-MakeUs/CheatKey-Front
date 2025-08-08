import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

import { postBlock } from "@/apis/community/postBlock";

export const useBlockUserMutation = (queryKeyToInvalidate: QueryKey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBlock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
    },
    onError: () => {
      alert("사용자 차단 실패");
    },
  });
};
