import { z } from "zod";

const MIN_TEXT_LENGTH = 10;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGE_COUNT = 5;
const TOO_SHORT_MSG = `최소 ${MIN_TEXT_LENGTH}자 이상 작성해주세요.`;
const IMAGE_TOO_LARGE_MSG = "사진 용량이 너무 커요.";
const NO_BOARD_SELECTED_MSG = "게시판을 선택해주세요.";

export const communityWriteSchema = z.object({
  title: z.string().trim().min(MIN_TEXT_LENGTH, TOO_SHORT_MSG),
  board: z.string().trim().min(1, NO_BOARD_SELECTED_MSG),
  content: z.string().trim().min(MIN_TEXT_LENGTH, TOO_SHORT_MSG),
  images: z
    .array(
      z.object({
        file: z
          .instanceof(File)
          .refine((file: File) => file.size <= MAX_IMAGE_SIZE, {
            message: IMAGE_TOO_LARGE_MSG,
          }),
      }),
    )
    .max(
      MAX_IMAGE_COUNT,
      `사진은 최대 ${MAX_IMAGE_COUNT}개까지 첨부할 수 있어요.`,
    )
    .default([]),
});
