import { authAPI } from "@/apis/instance";
import { generatePath } from "@/utils/generatePath";

import { API_DOMAINS } from "@/constants/apiConstants";
import type { ReportType } from "@/constants/reportReasons";

export const postReport = async ({
  reasonCode,
  postId,
}: {
  reasonCode: ReportType;
  postId: number;
}) => {
  const response = await authAPI.post(
    generatePath(API_DOMAINS.POST_REPORT, { postId }),
    { reasonCode },
  );
  return response.data;
};
