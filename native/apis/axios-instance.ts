import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export interface AppTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RequestSocialLoginBody {
  provider: SocialType;
  idToken: string;
  accessToken?: string;
}

export type SocialType = "kakao" | "apple";

export const baseAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
