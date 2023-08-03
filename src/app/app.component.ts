import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from './_services/weather.service';
import { Forecast } from './interfaces/forecast';
import { ExchangeRate } from './interfaces/exchange-rate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() city_name: string = "";
  title = 'assistence-travel-web-app';
  weather_forecast: any = [];
  forecast: any[] = [];
  initial_string: string = "Maputo";
  country: any = "";
  spinner = false;
  disabled = false;
  exchange_rates: any[] = [];
  rates = []

  constructor(private _weather: WeatherService) { }
  ngOnInit() {
    this.getWeather(this.initial_string);
    this.getExchangeRates()
  }

  getWeather(city_name: string) {
    this.disabled = true
    this.spinner = true
    this._weather.getWeather(city_name)
    .subscribe(res => {
      this.weather_forecast = res
      const country_code = this.weather_forecast.sys.country;
      this.country = this.convertCountryCode(country_code)
      this.city_name = ""
      this.disabled = false
      this.spinner = false
    })
    this._weather.getWeatherForecast(city_name).subscribe(response => {
      this.forecast = response.list
    })
  }
  search() {
    this.getWeather(this.city_name)
  }
  // convert country code to name
  convertCountryCode(country: string) {
    let regionNames = new Intl.DisplayNames(["pt"], { type: "region" });
    return regionNames.of(country)
  }

  getExchangeRates(){
    this._weather.getExchangeRates().subscribe(res => {
      this.spinner = true
      this.exchange_rates = res
      this.forecast.forEach((element) => {
        console.log(element)
      })
      this.spinner = false
    })
  }
}
