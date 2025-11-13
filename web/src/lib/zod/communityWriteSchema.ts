import { z } from "zod";

import {
  COMMUNITY_WRITE_LIMIT,
  COMMUNITY_ERROR_MESSAGE,
} from "@/constants/communityWriteConstants";

export const imageFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file: File) => file.size <= COMMUNITY_WRITE_LIMIT.MAX_IMAGE_SIZE, {
      message: COMMUNITY_ERROR_MESSAGE.IMAGE_TOO_LARGE(
        COMMUNITY_WRITE_LIMIT.MAX_IMAGE_SIZE_MB,
      ),
    }),
  previewUrl: z.string(),
});

export const imagesSchema = z
  .array(imageFileSchema)
  .max(
    COMMUNITY_WRITE_LIMIT.MAX_IMAGE_COUNT,
    COMMUNITY_ERROR_MESSAGE.MAX_IMAGE_COUNT(
      COMMUNITY_WRITE_LIMIT.MAX_IMAGE_COUNT,
    ),
  );

export const communityWriteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(
      COMMUNITY_WRITE_LIMIT.MIN_TITLE_LENGTH,
      COMMUNITY_ERROR_MESSAGE.TOO_TITLE_SHORT,
    ),
  board: z.string().trim().min(1, COMMUNITY_ERROR_MESSAGE.NO_BOARD_SELECTED),
  content: z
    .string()
    .trim()
    .min(
      COMMUNITY_WRITE_LIMIT.MIN_TEXT_LENGTH,
      COMMUNITY_ERROR_MESSAGE.TOO_TEXT_SHORT,
    ),
  images: imagesSchema.default([]),
});
