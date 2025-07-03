import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStats } from '../../model/DashboardStats.model';
import { environment } from '../../../environment';


@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(private http: HttpClient) {}

  getStats(params: any): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${environment.apiUrl}/statistic`,{params});
  }
}
