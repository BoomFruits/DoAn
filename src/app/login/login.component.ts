import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  email = '';
  password = '';
  error = '';
  constructor(private auth: AuthService,private router: Router){}
  ngOnInit(): void {
   
  }
  onLogin(){
    this.auth.login(this.email,this.password).subscribe({
      next: ()=> {
        console.log("Login successfully")
        this.router.navigate(['/WeatherForecast'])
      },
      error: err => this.error = 'Login failed'
    })
  }
}
