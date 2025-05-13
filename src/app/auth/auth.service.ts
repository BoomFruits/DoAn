import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';
  private apiUrl = 'https://localhost:7275/api/auth';
  constructor(private http: HttpClient) {}

  login(email: string, password: string):Observable<any>{
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(res => localStorage.setItem(this.tokenKey, res.token)));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() < payload.exp * 1000;
  }
  register(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,data);
  }
}
