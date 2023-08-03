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
    return this.http.get<any>('http://api.exchangeratesapi.io/v1/latest?access_key=18ee1beb2c736339ea82fa6a410336c5&symbols=USD,MZN,ZAR,AUD,CAD,GBP,JPY').pipe()
  }
}
