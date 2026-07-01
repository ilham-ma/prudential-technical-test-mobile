export interface IProductPayload {
  title: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  stock: number;
  thumbnail?: string;
}
