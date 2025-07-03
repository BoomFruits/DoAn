// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { CreateProduct } from '../../model/createProduct.model';
import { ProductFilter, PagedResult } from '../../model/productFilter.model';
import { UpdateProduct } from '../../model/updateProduct.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cancelBooking(id: number) {
    return this.http.delete(`${environment.apiUrl}/product/cancel/${id}`, {});
  }

  constructor(private http: HttpClient) {}
   getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/product`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/product/${id}`);
  }

  create(product: Product): Observable<any> {
    return this.http.post(`${environment.apiUrl}/product`, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.apiUrl}/product/${product.id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/product/${id}`);
  }

  filter(filter: ProductFilter): Observable<PagedResult<Product>> {
    return this.http.post<PagedResult<Product>>(`${environment.apiUrl}/product/filter`, filter);
  }
  getImageFullPath(relativePath: string): string {
    return `${environment.apiUrl}${relativePath}`;
  }

}
