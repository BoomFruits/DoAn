import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';

@Injectable({ providedIn: 'root' })
export class AdminRoomService {
  private apiUrl = 'https://localhost:7275/api/AdminRoom';
  private imageBaseUrl = 'https://localhost:7275/uploads/rooms';
  constructor(private http: HttpClient) {}
  getImageBaseUrl(){
    return this.imageBaseUrl;
  }
  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/get_all_rooms");
  }
  getActiveRooms():Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/get_active_rooms");
  }
  getRoomById(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createRoom(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateRoom(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}