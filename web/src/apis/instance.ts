import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

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
