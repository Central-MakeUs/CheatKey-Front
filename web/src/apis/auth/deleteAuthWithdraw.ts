import { authAPI } from "@/apis/instance";

import { API_DOMAINS } from "@/constants/api/apiConstants";

export const deleteAuthWithdraw = async (): Promise<void> => {
  await authAPI.delete(API_DOMAINS.DELETE_AUTH_WITHDRAW, {
    data: { reasonCode: "WITHDRAWAL_REASON_006" },
  });
};
