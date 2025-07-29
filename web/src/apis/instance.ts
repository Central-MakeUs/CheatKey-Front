import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import { onRequest, onResponseError } from "@/apis/interceptors";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = (
  baseURL: string,
  options?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    ...options,
  });
  return instance;
};

export const authAPI: AxiosInstance = axiosInstance(BASE_URL);

authAPI.interceptors.request.use(onRequest);

authAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => onResponseError(error, authAPI),
);
