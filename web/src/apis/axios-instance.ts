import axios from "axios";

const dummyBaseURL = import.meta.env.VITE_API_BASE_URL as string;

export const baseAPI = axios.create({
  baseURL: dummyBaseURL,
});
