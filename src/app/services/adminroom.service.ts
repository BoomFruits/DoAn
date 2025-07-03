import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class AdminRoomService {
  private imageBaseUrl = `${environment.apiUrl}/room/uploads/rooms`;
  constructor(private http: HttpClient) {}
  getImageBaseUrl(){
    return this.imageBaseUrl;
  }
  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/room/get_all_rooms`);
  }
  getActiveRooms():Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/room/get_active_rooms`);
  }
  getRoomById(id: number): Observable<any>{
    return this.http.get(`${environment.apiUrl}/room/${id}`);
  }
  createRoom(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/room`, formData);
  }

  updateRoom(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/room/${id}`, formData);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/room/${id}`);
  }
  
}