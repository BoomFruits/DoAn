import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink,Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { DropdownsComponent } from '../admin/views/buttons/dropdowns/dropdowns.component';
import { AvatarComponent, DropdownComponent, DropdownModule } from '@coreui/angular';


@Component({
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  selector: 'app-header',
  imports: [RouterLink,RouterModule,CommonModule,DropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    getUserName() {
      return this.authService.getUserName();
    }
  constructor(private router: Router,private authService: AuthService){
    // this.router.events.subscribe(event => {
    //   // console.log(this.router.url);
    // })
  }
  onLogin(){
      this.router.navigate(['/login']);
    }
    isLogged(): boolean{
      return this.authService.isLoggedIn();
    }
    onLogout(){
      this.authService.logout();
      this.router.navigate(['/room'])
    }
    isAdmin(){
      return this.authService.isAdmin();
    }
}
