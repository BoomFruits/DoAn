import { Component } from '@angular/core';
import { Weather } from '../../model/weather.model';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-weather',
    imports: [CommonModule],
    standalone:true,
    templateUrl: './weather.component.html',
    styleUrl: './weather.component.scss'
})
export class WeatherComponent {
 data: Weather[] = [];
 constructor(private weatherService: WeatherService,private router: Router,private authService : AuthService){}
 ngOnInit(): void {
  this.getAll();
}

 getAll(){
  this.weatherService.getAll().subscribe((res:any)=>{
    this.data = res;
  })
 }
 onLogout(){
  this.authService.logout();
  this.router.navigate(['/login']);
 }
}
