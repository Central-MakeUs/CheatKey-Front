import type { NicknameStatus } from "@/types/signup/signup.types";

export const validateNicknameFormat = (text: string): NicknameStatus => {
  if (!text || text.trim().length === 0) return "NORMAL";

  // 허용된 문자(한글, 영문 소문자, 숫자) 외에 다른 문자가 있는지 검사
  // [^...]: 괄호 안의 문자를 제외한 모든 문자와 일치
  const invalidCharsRegex = /[^a-z0-9가-힣]/;

  if (invalidCharsRegex.test(text)) {
    return "INVALID_FORMAT";
  }

  if (text.length < 2) return "TOO_SHORT";
  if (text.length > 5) return "TOO_LONG";

  return "VALID_FORMAT";
};
