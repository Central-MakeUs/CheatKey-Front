import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { bridge } from "@/bridge";
import { useAuthStore } from "@/stores/useAuthStore";

import { PAGE_PATH } from "@/constants/path";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

interface FailedQueuePromise {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueuePromise[] = [];
const MAX_RETRIES = 1;

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

export const onResponseError = async (
  error: AxiosError,
  api: AxiosInstance,
): Promise<AxiosResponse> => {
  const originalRequest = error.config as CustomAxiosRequestConfig;
  const { status } = error.response || {};

  if (!originalRequest) return Promise.reject(error);

  const currentRetryCount = originalRequest._retryCount || 0;

  if (status === 401 && currentRetryCount < MAX_RETRIES) {
    originalRequest._retryCount = currentRetryCount + 1;

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newAccessToken) => {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const result = await bridge.refreshTokens();
      const newAccessToken = result.accessToken;

      if (newAccessToken) {
        useAuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } else {
        throw new Error("토큰 재발급이 실패했습니다.");
      }
    } catch (refreshError) {
      useAuthStore.getState().clearAccessToken();
      processQueue(refreshError as AxiosError, null);

      window.location.href = PAGE_PATH.AUTH.LOGIN;
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
};
