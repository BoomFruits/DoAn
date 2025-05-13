import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable,of} from 'rxjs';
import { Weather } from '../model/weather.model';
const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}
const apiUrl = 'https://localhost:7275/WeatherForecast';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }
  getAll():Observable<Weather[]>{
    return this.httpClient.get<Weather[]>(apiUrl).pipe();
  }
}
