import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { postBlock } from "@/apis/community/postBlock";

export const useBlockUserMutation = (queryKeyToInvalidate: QueryKey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBlock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 400) {
        alert("본인은 차단할 수 없습니다.");
      } else {
        alert("사용자 차단에 실패하였습니다. 잠시 후 다시 시도해주세요.");
      }
    },
  });
};
