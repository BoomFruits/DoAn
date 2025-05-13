import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
import {
  ContainerComponent,
  DropdownComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { NgScrollbar } from 'ngx-scrollbar';
import {  cilCalculator,
  cilStar,
  cilDescription,
  cilSun,
  cilMoon,
  cilContrast,
  cilBell,
  cilEnvelopeOpen,
  cilTask,
  cilCommentSquare,
  cilUser,
  cilSettings,
  cilCreditCard,
  cilFile,
  cilLockLocked,
  cilAccountLogout,
  cilMenu,
  cilList, 
  cilSpeedometer,
  cilDrop,
  cilPuzzle,
  cilCursor,
  cilNotes,
  cilChartPie,
  cilPencil} from '@coreui/icons';
import { logo } from '../../icons/logo';
import { signet } from '../../icons/signet';

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
    DefaultFooterComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent {
  public navItems = [...navItems];
  constructor(private iconSet:IconSetService) {
    this.iconSet.icons = {
      cilCalculator,
      cilStar,
      cilDescription,
      cilSun,
      cilMoon,
      cilContrast,
      cilBell,
      cilEnvelopeOpen,
      cilTask,
      cilCommentSquare,
      cilUser,
      cilSettings,
      cilCreditCard,
      cilFile,
      cilLockLocked,
      cilAccountLogout,
      cilMenu,
      cilList,logo,
      signet,cilSpeedometer,cilDrop,cilPuzzle,cilCursor,cilNotes,cilChartPie,cilPencil
    };
  }
}
