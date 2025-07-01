import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password',
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  imports: [FormsModule,CommonModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
passwordData = { oldPassword: '', newPassword: '' };
passwordMessage = '';
passwordSuccess = false;
constructor(private authService: AuthService,private userService: UserService){}
changePassword() {
  const userId = this.authService.GetUserId();
  this.userService.changePassword(userId, this.passwordData).subscribe({
      next: (res) => {
      this.passwordMessage = res.passwordMessage; 
      this.passwordSuccess = true;
    },
    error: (err) => {
      console.error(err);
      this.passwordMessage = err.passwordMessage || 'Đổi mật khẩu thất bại!';
      this.passwordSuccess = false;
    }
  });
}

}
