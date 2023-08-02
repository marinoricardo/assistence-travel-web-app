import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../interfaces/weather';
import { URL } from 'src/URL';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherForecast(city_name: string){
    return this.http.get<Weather>(`${URL.forecastBaseUrl}/weather?q=${city_name}&appid=64f60853740a1ee3ba20d0fb595c97d5&units=metric`).pipe();
  }
}
