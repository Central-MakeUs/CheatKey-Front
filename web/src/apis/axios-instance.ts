import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const baseAPI = axios.create({
  baseURL: baseURL,
  //withCredentials: true,
});
