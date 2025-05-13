import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuth = this.auth.isLoggedIn();
    console.log('AuthGuard check:', isAuth);
    if (isAuth) return true;
    this.router.navigate(['/login']);
    return false;
  }
  
}
