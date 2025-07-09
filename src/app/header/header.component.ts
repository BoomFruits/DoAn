import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink,Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { DropdownsComponent } from '../admin/views/buttons/dropdowns/dropdowns.component';
import { AvatarComponent, DropdownComponent, DropdownModule, HeaderNavComponent } from '@coreui/angular';
import { NotificationDTO } from '../../model/NotificationDTO.model';
import { NotificationService } from '../services/notification.service';
@Component({
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  selector: 'app-header',
  imports: [RouterLink,RouterModule,CommonModule,DropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    getUserName() {
      return this.authService.getUserName();
    }
  constructor(private router: Router,private authService: AuthService,private notificationService: NotificationService){
  }
   notifications: NotificationDTO[] = [];
    notificationCount = 0;
    showNotif = false;
    ngOnInit(): void {
       this.notificationService.startConnection();
       const userId = this.authService.GetUserId();
       if(userId){
        // Lấy toàn bộ thông báo từ server
        this.notificationService.getUserNotifications(userId).subscribe(data => {
          this.notifications = data;
          // Đếm số lượng chưa đọc
          this.notificationCount = data.filter(n => !n.isRead).length;
        });
        // Lắng nghe thông báo realtime từ SignalR
      this.notificationService.notification$.subscribe((notif) => {
        this.notifications.unshift(notif);
        this.notificationCount++;
      });
       }
    }
    toggleNotifications() {
      this.showNotif = !this.showNotif;
      if (this.showNotif) {
        this.notificationCount = 0;
      }
    this.notifications
      .filter(n => !n.isRead)
      .forEach(n => {
        this.notificationService.markAsRead(n.id).subscribe(() => {
          n.isRead = true;
        });
      });
    }
    onLogin(){
      this.router.navigate(['/login']);
    }
    isLogged(): boolean{
      return this.authService.isLoggedIn();
    }
    onLogout(){
      this.authService.logout();
      this.router.navigate(['/room'])
    }
    isAdmin(){
      return this.authService.isAdmin() && this.authService.isLoggedIn();
    }
     openBookingDetail(bookingId: number){
    this.router.navigate(['/booking-detail',bookingId]);
  }
}
