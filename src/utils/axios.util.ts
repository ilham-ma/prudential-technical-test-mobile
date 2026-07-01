import Axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../configs/api.config";

export const http = Axios.create({
  baseURL: API_URL,
});

http.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
