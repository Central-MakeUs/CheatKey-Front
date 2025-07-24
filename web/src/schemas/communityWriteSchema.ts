import { z } from "zod";

const MIN_TEXT_LENGTH = 10;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const TOO_SHORT_MSG = `최소 ${MIN_TEXT_LENGTH}자 이상 작성해주세요.`;

export const communityWriteSchema = z.object({
  title: z.string().trim().min(MIN_TEXT_LENGTH, TOO_SHORT_MSG),
  board: z.string().trim().min(1, "게시판을 선택해주세요."),
  content: z.string().trim().min(MIN_TEXT_LENGTH, TOO_SHORT_MSG),
  images: z
    .array(
      z.object({
        file: z.instanceof(File).refine((file) => file.size <= MAX_IMAGE_SIZE, {
          message: "사진 용량이 너무 커요.",
        }),
      }),
    )
    .default([]),
});
