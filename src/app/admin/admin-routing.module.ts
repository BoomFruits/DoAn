import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from '../room/room.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TypographyComponent } from './views/theme/typography.component';
import { DefaultLayoutComponent } from './layout';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'room',component:RoomManagementComponent},
  {path:'home',component:DefaultLayoutComponent},
  {path:'',component:DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
