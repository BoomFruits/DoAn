import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-forgot-password',
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  imports: [FormsModule, CommonModule,],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
email: string = '';
message: string = '';
constructor(private userService:UserService){}
submitForgotPassword() {
  this.userService.forgotPassword(this.email).subscribe({
    next: res => this.message = res.message,
    error: err => this.message = err.message,
  });
}
}
