import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private apiUrl = 'https://localhost:7275/api/room';
  private imageBaseUrl = 'https://localhost:7275/uploads/rooms';
  constructor(private http: HttpClient) {}
  getImageBaseUrl(){
    return `${environment.apiUrl}/uploads/rooms`;
  }
  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}`+"/room/get_all_rooms");
  }
  getRoomById(id: number): Observable<any>{
    return this.http.get(`${environment.apiUrl}/room/${id}`);
  }
  getActiveRoom(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/room/get_active_rooms`);
  }
}