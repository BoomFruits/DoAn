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
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.apiUrl}`+"/room/get_all_rooms");
  }
  getRoomById(id: number): Observable<Room>{
    return this.http.get<Room>(`${environment.apiUrl}/room/${id}`);
  }
  getActiveRoom(): Observable<Room[]>{
    return this.http.get<Room[]>(`${environment.apiUrl}/room/get_active_rooms`);
  }
  getTopRoom(): Observable<Room[]>{
    return this.http.get<Room[]>(`${environment.apiUrl}/room/get_top_rooms`);
  }
}