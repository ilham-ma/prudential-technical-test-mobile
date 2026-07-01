import { AxiosResponse } from "axios";
import { LoginFormValues } from "../components/login/login-form/schema";
import { API_URL } from "../configs/api.config";
import { ILoginResponse } from "../interfaces/login/login-response.interface";
import { http } from "../utils/axios.util";

export async function authService_login(payload: LoginFormValues) {
  const response: AxiosResponse<ILoginResponse> = await http.post(
    `${API_URL}/auth/login`,
    payload,
  );

  return response.data;
}
