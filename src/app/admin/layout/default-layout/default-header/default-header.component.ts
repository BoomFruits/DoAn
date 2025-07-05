import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';

import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  SidebarToggleDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationDTO } from '../../../../../model/NotificationDTO.model';
import { AuthService } from '../../../../auth/auth.service';

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html',
    standalone:true,
  imports: [CommonModule,ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, DropdownComponent, DropdownToggleDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent]
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor(private notificationService: NotificationService,private router: Router,private authService: AuthService) {
    super();
  }
    sidebarId = input('sidebar1');
  notifications: NotificationDTO[] = [];
  notificationCount = 0;
  showNotif = false;
  ngOnInit(): void {
     this.notificationService.startConnection();
     // Lấy toàn bộ thông báo từ server
      this.notificationService.getAllNotif().subscribe(data => {
        this.notifications = data;
        // Đếm số lượng chưa đọc
        this.notificationCount = data.filter(n => !n.adminRead).length;
      });
      // Lắng nghe thông báo realtime từ SignalR
    this.notificationService.notification$.subscribe((notif) => {
      this.notifications.unshift(notif);
      this.notificationCount++;
    });
  }
  toggleNotifications() {
    this.showNotif = !this.showNotif;
    if (this.showNotif) {
      this.notificationCount = 0;
    }
  }
  openBookingDetail(notificationId: number,bookingId: number){
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      const noti = this.notifications.find(n => n.id === notificationId);
      if (noti) noti.adminRead = true;
    });
    this.router.navigate(['/booking-detail',bookingId]);
  }
  logout(){
      this.authService.logout();
      this.router.navigate(['/room'])
  }
}
