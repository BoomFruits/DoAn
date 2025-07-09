import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../../model/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    GoogleSigninButtonModule,
    SocialLoginModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userDb!: User;
  email = '';
  password = '';
  error = '';
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private socialAuthService: SocialAuthService
  ) {}
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if (user) {
        if (user.provider === 'GOOGLE') {
          this.auth
            .loginWithGoogleToken(user.idToken)
            .then(() => {
              this.handleLogin();
            })
            .catch((err) => {
              console.error(err);
              this.error = 'Đăng nhập Google thất bại';
              this.toastr.error(this.error);
            });
        } else if (user.provider === 'FACEBOOK') {
          this.socialAuthService
            .signIn(FacebookLoginProvider.PROVIDER_ID)
            .then((user) => {
              if (user && user.provider === 'FACEBOOK') {
                this.auth
                  .loginWithFacebookToken(user.authToken)
                  .then(() => this.handleLogin())
                  .catch((err) => {
                    console.error(err);
                    this.error = 'Đăng nhập Facebook thất bại';
                    this.toastr.error(this.error);
                  });
              }
            });
        }
      }
    });
  }
  handleLogin() {
    if (!this.auth.isAdmin()) {
      var userId = this.auth.GetUserId();
      this.userService.getUserById(userId).subscribe((userDb) => {
        this.userDb = userDb;
        if (!this.userDb.phoneNumber || !this.userDb.address) {
          this.toastr.success(
            'Đăng nhập thành công! Mật khẩu mặc định đã được gửi tới email của bạn.'
          );
          this.router.navigate(['/profile']);
        } else {
          this.router.navigate(['/home']);
        }
      });
    } else this.router.navigate(['/admin']);
  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        if (!this.auth.isAdmin()) {
          this.router.navigate(['/home']);
        } else {
          console.log('Admin login successfully');
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => this.toastr.error('Lỗi' + err),
    });
  }
}
