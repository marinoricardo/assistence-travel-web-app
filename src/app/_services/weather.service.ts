import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../interfaces/weather';
import { URL } from 'src/URL';
import { ExchangeRate } from '../interfaces/exchange-rate';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city_name: string){
    return this.http.get<Weather>(`${URL.forecastBaseUrl}/weather?q=${city_name}&appid=${URL.apiKey}&units=metric`).pipe();
  }
  getWeatherForecast(city_name: string){
    return this.http.get<any>(`${URL.forecastBaseUrl}/forecast?q=${city_name}&appid=${URL.apiKey}&units=metric`).pipe();
  }

  getExchangeRates(){
    return this.http.get<any>('https://v6.exchangerate-api.com/v6/3120e260d315985f902abd0a/latest/MZN').pipe()
  }
}
