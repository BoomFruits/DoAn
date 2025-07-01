import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { AdminGuard } from './auth/admin.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { RoomComponent } from './room/room.component';
import { AppRoomCardComponent } from './app-room-card/app-room-card.component';
import { ServiceComponent } from './service/service.component';
import { BookingComponent } from './booking/booking.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

export const routes: Routes = [
    {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'room', component: RoomComponent },
      { path: 'room/:id', component: RoomDetailComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'booking/:id', component: BookingComponent ,canActivate: [AuthGuard]},
      // { path: 'booking-detail/:roomid', component: BookingDetailComponent },
      {path: 'my-bookings',component:BookingHistoryComponent,canActivate: [AuthGuard]},
      { path: 'room-card', component: AppRoomCardComponent },
      { path: 'WeatherForecast', component: WeatherComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      {path: 'profile',component:ProfileComponent,canActivate: [AuthGuard]},
      {path:'password',component:PasswordComponent,canActivate:[AuthGuard]},
      {path: 'forgotpassword',component:ForgotPasswordComponent},
      { path: 'register', component: RegisterComponent },
      { path: 'payment-success', component: PaymentSuccessComponent },
  // { path: 'paypal-cancel', component: PaypalCancelComponent }, // Tuỳ chọn nếu muốn xử lý hủy thanh toán
      {path:'payment/:bookingId',component:PaymentComponent,canActivate:[AuthGuard]}
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./admin/admin.routes').then(m => m.routes)
  },
  { path: '**', redirectTo: 'home' }
    
];
