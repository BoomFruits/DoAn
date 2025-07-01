import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStats } from '../../model/DashboardStats.model';


@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = 'https://localhost:7275/api/statistic';

  constructor(private http: HttpClient) {}

  getStats(params: any): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}`,{params});
  }
}
