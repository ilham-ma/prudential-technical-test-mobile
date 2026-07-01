import { API_URL } from "@/configs/api.config";
import Axios from "axios";

export const http = Axios.create({
  baseURL: API_URL,
});
