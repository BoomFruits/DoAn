import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/User.model';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user!: User;
  message = '';
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.GetUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (res) => {
          this.user = res;
          if (!this.user.address || !this.user.phoneNumber) {
            alert('Please complete your profile before booking.');
          }
        },
        error: (err) => console.error('Không lấy được user:', err),
      });
    }
  }

  updateProfile() {
    this.userService
      .updateUser(this.user.id, {
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        address: this.user.address,
        gender: this.user.gender,
        roleId: this.authService.getRole() == 'Admin' ? 2 : 1,
      })
      .subscribe({
        next: () => {
          console.log(this.user);
          this.message = 'Cập nhật thành công!';
        },
        error: (err) => {
          console.error(err);
          this.message = 'Lỗi khi cập nhật.';
        },
      });
  }
}
