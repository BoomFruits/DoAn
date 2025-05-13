import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { RoomManagementComponent } from './room-management/room-management.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RoomManagementComponent,
    DashboardComponent,
    SidebarModule,
    DropdownModule,
    IconModule
  ],
  providers:[
    IconSetService
  ]
})
export class AdminModule { }
