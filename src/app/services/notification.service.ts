import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { environment } from "../../../environment";
import { NotificationDTO } from "../../model/NotificationDTO.model";
import { Subject } from "rxjs/internal/Subject";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class NotificationService {
     private hubConn!: signalR.HubConnection;
     private notificationSubject = new Subject<NotificationDTO>();
     constructor(private http: HttpClient,private authService: AuthService){}
      notification$ = this.notificationSubject.asObservable();
    startConnection(){
      this.hubConn = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.hubUrl}/notificationHub`)
        .build();
     this.hubConn.start()
        .then(() => console.log('Chuỗi kết nối SignalR đã mở'))
        .catch(err => console.log("Lỗi SinalR: ",err));
    this.hubConn.on("ReceiveNotification",(notification: NotificationDTO) => {
        this.notificationSubject.next(notification);
    })
    }
    getAllNotif():Observable<NotificationDTO[]> {
     return this.http.get<NotificationDTO[]>(`${environment.apiUrl}/notification/all`);
    } 
   getUserNotifications(userId: string):Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(`${environment.apiUrl}/notification/user/${userId}`);
  } 
    markAsRead(notificationId: number): Observable<void> {
        return this.http.put<void>(`${environment.apiUrl}/notification/${notificationId}/read`, {}); }
    markAdminRead(notificationId: number): Observable<void> {
          return this.http.put<void>(`${environment.apiUrl}/notification/${notificationId}/admin-read`, {});
    }
}