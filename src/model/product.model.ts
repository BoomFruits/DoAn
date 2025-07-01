export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stockQuantity: number;
  unit: string;
  isAvailable: boolean;
  categoryId: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}