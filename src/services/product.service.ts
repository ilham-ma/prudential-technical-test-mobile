import { AxiosResponse } from "axios";
import { API_URL } from "../configs/api.config";
import { IProduct } from "../interfaces/product/product.interface";
import { IProductListResponse } from "../interfaces/product/product-list-response.interface";
import { IProductPayload } from "../interfaces/product/product-payload.interface";
import { http } from "../utils/axios.util";

export async function productService_getList({
  limit = 10,
  skip = 0,
  q,
}: {
  limit?: number;
  skip?: number;
  q?: string;
}) {
  const endpoint = q
    ? `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
    : `/products?limit=${limit}&skip=${skip}`;

  const response: AxiosResponse<IProductListResponse> = await http.get(
    `${API_URL}${endpoint}`,
  );
  return response.data;
}

export async function productService_getDetail(id: number) {
  const response: AxiosResponse<IProduct> = await http.get(
    `${API_URL}/products/${id}`,
  );
  return response.data;
}

export async function productService_add(payload: IProductPayload) {
  const response: AxiosResponse<IProduct> = await http.post(
    `${API_URL}/products/add`,
    payload,
  );
  return response.data;
}

export async function productService_edit(id: number, payload: IProductPayload) {
  const response: AxiosResponse<IProduct> = await http.put(
    `${API_URL}/products/${id}`,
    payload,
  );
  return response.data;
}

export async function productService_delete(id: number) {
  const response: AxiosResponse<{ id: number; isDeleted: boolean }> =
    await http.delete(`${API_URL}/products/${id}`);
  return response.data;
}
