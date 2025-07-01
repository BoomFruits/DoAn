import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { payment } from '../../model/Payment.model';
import { UpdateUserDTO } from '../../model/updateUserDTO.model';
import { User } from '../../model/User.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://localhost:7275/api/users';
   private apiRoleUrl = 'https://localhost:7275/api/roles';
  constructor(private http: HttpClient) {}
  getUserById(id: string): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  updateUser(id: string,user: UpdateUserDTO):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,user);
  }
  changePassword(id: string, data: { oldPassword: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/change-password`, data);
  }
  forgotPassword(email: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/forgot-password`, {email});
  }
  getAll(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }
  delete(id: string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getAllRole(): Observable<{ id: number, rolename: string }[]> {
    return this.http.get<{ id: number, rolename: string }[]>(this.apiRoleUrl);
  }
}