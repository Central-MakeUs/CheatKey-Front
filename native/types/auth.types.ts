export type SocialType = "kakao" | "apple";
export type UserState =
  | "ACTIVE"
  | "PENDING"
  | "WITHDRAWN"
  | "INACTIVE"
  | "BANNED";

export interface SocialLoginApiRequest {
  provider: SocialType;
  idToken: string;
  accessToken?: string;
}

export interface SocialLoginApiResponse {
  userState: UserState;
  grantType: "Bearer";
  accessToken: string;
  refreshToken: string;
}

interface BridgeSuccessResponse<T> {
  success: true;
  data: T;
}

interface BridgeFailureResponse {
  success: false;
  message: string;
}

export type BridgeResponse<T> =
  | BridgeSuccessResponse<T>
  | BridgeFailureResponse;

export interface LoginResultData {
  userState: UserState;
  accessToken: string;
}

export type BridgeLoginResult = BridgeResponse<LoginResultData>;
