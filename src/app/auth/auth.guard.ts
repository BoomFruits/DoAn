import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastrService } from "ngx-toastr";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService) {}

  canActivate(): boolean {
    const isAuth = this.auth.isLoggedIn();
    if (isAuth) return true;
     this.toastr.warning("Đăng nhập để tiếp tục","Bạn chưa đăng nhập");
    this.router.navigate(['/login']);
    return false;
  }
  
}
