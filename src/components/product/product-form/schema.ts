import { z } from "zod";

export const productFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or more"),
  thumbnail: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
