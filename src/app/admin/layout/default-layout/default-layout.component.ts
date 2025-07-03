import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarModule,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from '.';
import { navItems } from './_nav';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone:true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    // DefaultFooterComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective,
    SidebarModule
  ]
})
export class DefaultLayoutComponent {
  public   navItems = [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      iconComponent: { name: 'cil-speedometer' },
    },
    {
      name: 'Phòng',
      url: '/admin/room',
      iconComponent: { name: 'cil-home' },
    },
    {
      name: 'Sản phẩm',
      url: '/admin/product',
      iconComponent: { name: 'cil-square' },
    },
    {
      name: 'Đơn đặt phòng',
      url: '/admin/booking',
      iconComponent: { name: 'cil-calendar' },
    },
    {
      name: 'Danh mục',
      url: '/admin/category',
      iconComponent: { name: 'cil-list' },
    },
    {
      name: 'Người dùng',
      url: '/admin/user',
      iconComponent: { name: 'cil-user' },
    }
  ];
}
