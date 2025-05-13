import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAdmin()) return true;
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
