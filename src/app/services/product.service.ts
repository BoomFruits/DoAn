// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { CreateProduct } from '../../model/createProduct.model';
import { ProductFilter, PagedResult } from '../../model/productFilter.model';
import { UpdateProduct } from '../../model/updateProduct.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cancelBooking(id: number) {
    return this.http.delete(`${this.apiUrl}/cancel/${id}`, {});
  }
  private apiUrl = 'https://localhost:7275/api/product';

  constructor(private http: HttpClient) {}
   getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filter(filter: ProductFilter): Observable<PagedResult<Product>> {
    return this.http.post<PagedResult<Product>>(`${this.apiUrl}/filter`, filter);
  }
  getImageFullPath(relativePath: string): string {
    return `https://localhost:7275${relativePath}`;
  }

}
