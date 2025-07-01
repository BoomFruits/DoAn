import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { from, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';
  private apiUrl = 'https://localhost:7275/api/auth';
  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      );
  }
  loginWithGoogleToken(idToken: string): Promise<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, {
        provider: 'GOOGLE',
        idTokenOrAccessToken: idToken,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      )
      .toPromise();
  }

  loginWithFacebookToken(accessToken: string): Promise<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, {
        provider: 'FACEBOOK',
        idTokenOrAccessToken: accessToken,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      )
      .toPromise();
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.socialAuthService.signOut();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
  private getTokenPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    const base64 = token.split('.')[1];
    try {
      // Decode base64 with Unicode support
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
      );
      return JSON.parse(json);
    } catch (e) {
      console.error('Invalid token payload', e);
      return null;
    }
  }

  getRole(): string | null {
    const payload = this.getTokenPayload();
    return (
      payload?.[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] ?? null
    );
  }

  getUserName(): string | null {
    const payload = this.getTokenPayload();
    return (
      payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ??
      null
    );
  }
  GetUserId() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return (
        payload?.[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ] ?? null
      );
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }
  getEmai(): string | null {
    const payload = this.getTokenPayload();
    return payload?.['email'] ?? null;
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() < payload.exp * 1000;
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
