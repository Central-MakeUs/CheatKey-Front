import { authAPI } from "@/apis/instance";
import { generatePath } from "@/utils/generatePath";

import { API_DOMAINS } from "@/constants/apiConstants";
import type { ReportType } from "@/constants/reportReasons";

export const postReportComment = async ({
  reasonCode,
  commentId,
}: {
  reasonCode: ReportType;
  commentId: number;
}) => {
  const response = await authAPI.post(
    generatePath(API_DOMAINS.POST_COMMENT_POST, { commentId }),
    { reasonCode },
  );
  return response.data;
};
