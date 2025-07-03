export type SignUpForm = {
  nickname: string;
  age: Age;
  gender: Gender;
  method?: TradeMethod[];
  item?: ItemCategory[];
};

export type NicknameFormatStatus =
  | "NORMAL"
  | "VALID_FORMAT"
  | "INVALID_FORMAT"
  | "TOO_SHORT"
  | "TOO_LONG";
export type DuplicateCheckStatus = "IDLE" | "DUPLICATE" | "PASS";

export type Gender = "남자" | "여자" | null;

export type Age = "10~20대" | "30~40대" | "50~60대" | "60대 이상" | null;

export type TradeMethod =
  | "SNS 거래"
  | "중고거래사이트"
  | "블로그 거래"
  | "중고거래 앱"
  | "기타";

export type ItemCategory =
  | "전자제품"
  | "가전제품"
  | "티켓"
  | "패션"
  | "명품"
  // TODO: 아래 임시 값들은 실제 품목명으로 변경해야 합니다.
  | "임시값_1"
  | "임시값_2"
  | "임시값_3"
  | "임시값_4";
