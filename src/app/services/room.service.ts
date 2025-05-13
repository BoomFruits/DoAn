import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';


@Injectable({ providedIn: 'root' })
export class RoomService {
  private apiUrl = 'https://localhost:7275/api/room'; // thay đổi theo backend thực tế

  constructor(private http: HttpClient) {}

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  getById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  create(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  update(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${id}`, room);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
