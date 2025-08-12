export interface AgeCode {
  code: string;
  name: string;
  imageUrl: string | null;
  disabledImageUrl: string | null;
}

export interface GenderCode {
  code: string;
  name: string;
  imageUrl: string | null;
  disabledImageUrl: string | null;
}

export interface TradeMethodCode {
  code: string;
  name: string;
  imageUrl: string | null;
  disabledImageUrl: string | null;
}

export interface TradeItemCode {
  code: string;
  name: string;
  imageUrl: string | null;
  disabledImageUrl: string | null;
}

export interface Terms {
  id: number;
  title: string;
  subTitle: string;
  contents: string;
  required: boolean;
  version: string;
}

export interface RegisterResponse {
  ageCodeList: AgeCode[];
  genderCodeList: GenderCode[];
  tradeMethodCodeList: TradeMethodCode[];
  tradeItemCodeList: TradeItemCode[];
  termsList: Terms[];
}

export interface RegisterRequest {
  nickname: string;
  ageCode: string | null;
  genderCode: string | null;
  tradeMethodCodeList: string[];
  tradeItemCodeList: string[];
  agreedRequiredTerms: number[];
  agreedOptionalTerms: number[];
}

export type SignUpForm = {
  agreedTerms: number[];
  nickname: string;
  ageCode: string | null;
  genderCode: string | null;
  tradeMethodCodes: string[];
  tradeItemCodes: string[];
};

export type TermContent = {
  title: string;
  content: string;
};

export type NicknameStatus =
  | "NORMAL"
  | "VALID_FORMAT"
  | "INVALID_FORMAT"
  | "TOO_SHORT"
  | "TOO_LONG"
  | "PASS"
  | "DUPLICATE";
