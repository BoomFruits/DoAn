import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { AdminGuard } from './auth/admin.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { RoomComponent } from './room/room.component';
import { AppRoomCardComponent } from './app-room-card/app-room-card.component';

export const routes: Routes = [
    {path:'WeatherForecast',component:WeatherComponent,canActivate: [AuthGuard]},
    {path: 'login',component: LoginComponent},
    {path: 'register',component:RegisterComponent},
    {path: '',redirectTo:'login',pathMatch: 'full'},
    // {path: 'room',component:RoomComponent,canActivate: [AuthGuard,AdminGuard]},
    {path: 'room',component:RoomComponent},
    {path:'room-card',component:AppRoomCardComponent},
    {path:'admin',loadChildren: () => import('./admin/admin.routes').then(m => m.routes)},
    { path: '**', redirectTo: 'login' },
    
];
