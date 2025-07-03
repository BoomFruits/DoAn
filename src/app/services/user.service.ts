import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { payment } from '../../model/Payment.model';
import { UpdateUserDTO } from '../../model/updateUserDTO.model';

import { environment } from '../../../environment';
import { User } from '../../model/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://localhost:7275/api/users';
   private apiRoleUrl = 'https://localhost:7275/api/roles';
  constructor(private http: HttpClient) {}
  getUserById(id: string): Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
  updateUser(id: string,user: UpdateUserDTO):Observable<any>{
    return this.http.put(`${environment.apiUrl}/users/${id}`,user);
  }
  changePassword(id: string, data: { oldPassword: string, newPassword: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/${id}/change-password`, data);
  }
  forgotPassword(email: string): Observable<any>{
    return this.http.post(`${environment.apiUrl}/users/forgot-password`, {email});
  }
  getAll(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
  delete(id: string):Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`);
  }
  getAllRole(): Observable<{ id: number, rolename: string }[]> {
    return this.http.get<{ id: number, rolename: string }[]>(`${environment.apiUrl}/roles`);
  }
}