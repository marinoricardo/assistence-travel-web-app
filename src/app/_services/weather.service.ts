import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../interfaces/weather';
import { URL } from 'src/URL';

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
    return this.http.get<any>('https://v6.exchangerate-api.com/v6/3120e260d315985f902abd0a/latest/EUR').pipe()
  }

  getPopulation(indicator: string){
    return this.http.get<any>(`${URL.worldBankUrl}/${indicator}/indicator/SP.POP.TOTL?format=json`).pipe();
  }
  getGdpPerCapita(indicator: string){
    return this.http.get<any>(`${URL.worldBankUrl}/${indicator}/indicator/NY.GDP.MKTP.CD?format=json`).pipe();
  }
}
