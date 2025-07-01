export interface CreateProduct {
  title: string;
  thumbnail?: string;
  description?: string;
  price: number;
  stockQuantity: number;
  unit: string;
  categoryId: number;
}
