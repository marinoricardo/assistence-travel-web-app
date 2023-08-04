import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './_services/weather.service';
import { PopulationGdpComponent } from './components/population-gdp/population-gdp.component';
import Swal from 'sweetalert2';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(PopulationGdpComponent) populationGdpComponent!: PopulationGdpComponent;
  @Input() city_name: string = "";
  @Input() email: string = "";
  title = 'assistence-travel-web-app';
  weather_forecast: any = [];
  forecast: any[] = [];
  initial_string: string = "Maputo";
  country: any = "";
  spinner = false;
  disabled = false;
  exchange_rates: any;
  rates = [];
  country_code = "";
  currency = "";
  show_all = false;
  temp: number = 0
  temp_max: number = 0
  temp_min: number = 0
  isAuthenticate = false

  constructor(private _weather: WeatherService, private _auth: AuthService) { }
  ngOnInit() {
    this.getWeather(this.initial_string);
    this.getExchangeRates();
    let token = localStorage.getItem("token")
    if(token){
      this.isAuthenticate = true
    }else{
      this.isAuthenticate = false
    }
  }

  getWeather(city_name: string) {
    this.disabled = true
    this.spinner = true
    this._weather.getWeather(city_name)
      .subscribe(res => {
        this.weather_forecast = res
        this.temp = Math.round(this.weather_forecast.main.temp)
        this.temp_max = Math.round(this.weather_forecast.main.temp_max)
        this.temp_min = Math.round(this.weather_forecast.main.temp_min)
        this.country_code = res.sys.country;
        this.executePopulation(this.country_code)
        this.country = this.convertCountryCode(this.country_code)
        this.city_name = ""
        this.disabled = false
        this.spinner = false
      }, (error => {
        this.disabled = false
        this.spinner = false
      }))
    this._weather.getWeatherForecast(city_name).subscribe(response => {
      this.forecast = response.list
    }, (error => {
      Swal.fire({
        title: "Erro!",
        text: `${error.error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#8B0000",
      })
      this.spinner = false
      this.disabled = false
    }))
  }
  search() {
    this.getWeather(this.city_name)
  }
  // convert country code to name
  convertCountryCode(country: string) {
    let regionNames = new Intl.DisplayNames(["pt"], { type: "region" });
    return regionNames.of(country)
  }

  getExchangeRates() {
    this._weather.getExchangeRates().subscribe(res => {
      this.spinner = true
      this.exchange_rates = res
      this.spinner = false
    })
  }
  viewMore() {
    this.show_all = true
  }

  viewLess() {
    this.show_all = false
  }

  onEnterKeyPressed(event: any) {
    this.getWeather(event.srcElement.value)

  }
  executePopulation(country: string) {
    if (this.populationGdpComponent) {
      this.populationGdpComponent.executeCommand(country);
    }
  }

  authenticate(){
    let user = {
      'email' : this.email
    }
    this._auth.authenticate(user).subscribe((res) => {
     localStorage.setItem("token", res.token)
     document.getElementById('closeBtn')?.click()
     this.isAuthenticate = true
    })
  }
}
