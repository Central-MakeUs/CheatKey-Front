import { authAPI } from "@/apis/instance";
import { bridge } from "@/bridge";

import { API_DOMAINS } from "@/constants/apiConstants";

export const postAuthLogout = async (): Promise<void> => {
  const refreshToken = await bridge.getRefreshToken();
  await authAPI.post(
    API_DOMAINS.POST_AUTH_LOGOUT,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
};
