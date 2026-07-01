import Axios from "axios";
import { API_URL } from "../configs/api.config";

export const http = Axios.create({
  baseURL: API_URL,
});
