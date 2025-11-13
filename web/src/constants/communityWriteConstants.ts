export const COMMUNITY_WRITE_LIMIT = {
  MIN_TITLE_LENGTH: 2,
  MIN_TEXT_LENGTH: 10,
  MAX_IMAGE_SIZE_MB: 5,
  MAX_IMAGE_COUNT: 5,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024,
} as const;

export const COMMUNITY_ERROR_MESSAGE = {
  TOO_TITLE_SHORT: `제목을 최소 ${COMMUNITY_WRITE_LIMIT.MIN_TITLE_LENGTH}자 이상 작성해주세요.`,
  TOO_TEXT_SHORT: `내용을 최소 ${COMMUNITY_WRITE_LIMIT.MIN_TEXT_LENGTH}자 이상 작성해주세요.`,
  IMAGE_TOO_LARGE: (size: number) => `사진 용량이 ${size}MB를 초과해요.`,
  NO_BOARD_SELECTED: "게시판을 선택해주세요.",
  MAX_IMAGE_COUNT: (count: number) =>
    `사진은 최대 ${count}개까지 첨부할 수 있어요.`,
} as const;
