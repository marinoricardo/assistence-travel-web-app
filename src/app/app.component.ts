import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from './_services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() city_name: string = "";
  title = 'assistence-travel-web-app';
  weather_forecast: any = [];
  initial_string: string = "Maputo";
  country: any = ""

  constructor(private _weather: WeatherService) { }
  ngOnInit() {
    this.getWeatherForecast(this.initial_string)
  }

  getWeatherForecast(city_name: string) {
    // document.getElementById('loaderBtn')?.click()
    this._weather.getWeatherForecast(city_name)
    .subscribe(res => {
      this.weather_forecast = res
      const country_code = this.weather_forecast.sys.country;
      this.country = this.convertCountryCode(country_code)
      // document.getElementById('loaderCloseBtn')?.click()
      // this.city_name = ''
    })
  }
  search() {
    this.getWeatherForecast(this.city_name)
  }
  // convert country code to name
  convertCountryCode(country: string) {
    let regionNames = new Intl.DisplayNames(["pt"], { type: "region" });
    return regionNames.of(country)
  }
}
