import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private apiUrl = 'https://localhost:7275/api/room';
  private imageBaseUrl = 'https://localhost:7275/uploads/rooms';
  constructor(private http: HttpClient) {}
  getImageBaseUrl(){
    return this.imageBaseUrl;
  }
  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/get_all_rooms");
  }
  getRoomById(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getActiveRoom(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+"/get_active_rooms");
  }
}