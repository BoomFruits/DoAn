export interface ProductFilter {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  isAvailable?: boolean;
  page: number;
  pageSize: number;
}
export interface PagedResult<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}