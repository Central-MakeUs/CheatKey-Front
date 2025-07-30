import type { NicknameStatus } from "@/types/signup/signup.types";

export const SIGNUP_HEADER_CONFIG: Record<number, string> = {
  1: "닉네임 입력",
  2: "기본 정보 선택",
  3: "기본 정보 선택",
  4: "거래 방식",
  5: "주요 거래 품목",
};
export const NICKNAME_MESSAGES: Record<NicknameStatus, string> = {
  NORMAL: "이모티콘 및 영어 대문자는 사용할 수 없어요.",
  TOO_SHORT: "최소 2글자 이상 입력해주세요.",
  TOO_LONG: "닉네임은 5글자 이하로 입력해주세요.",
  INVALID_FORMAT: "사용할 수 없는 닉네임이에요.",
  VALID_FORMAT: "중복 확인 중이에요...",
  PASS: "사용 가능한 닉네임이에요.",
  DUPLICATE: "이미 존재하는 닉네임이에요.",
} as const;
