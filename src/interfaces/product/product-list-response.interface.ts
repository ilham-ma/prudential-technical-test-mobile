import { IProduct } from "./product.interface";

export interface IProductListResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
