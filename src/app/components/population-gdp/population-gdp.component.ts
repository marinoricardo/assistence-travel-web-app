import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/_services/weather.service';

@Component({
  selector: 'app-population-gdp',
  templateUrl: './population-gdp.component.html',
  styleUrls: ['./population-gdp.component.css']
})
export class PopulationGdpComponent implements OnInit {

  population: any[] = []
  gdp_per_capita: any[] = []
  last_update_pop = ""
  last_update_gdp = ""
  isAuthenticate = false
  constructor(private _population: WeatherService) { }

  ngOnInit(): void {
    let country = "MZ"
    this.getLast7YearsPopulations(country);
    this.getLast7YearsGDP(country)
    let token = localStorage.getItem("token")
    if(token){
      this.isAuthenticate = true
    }else{
      this.isAuthenticate = false
    }
  }

  getLast7YearsPopulations(country_code: string){
    this._population.getPopulation("MZ").subscribe(res => {
      this.last_update_pop = res[0].lastupdated
      this.population = res[1].slice(0,6)
    })
  }
  getLast7YearsGDP(country_code: string){
    this._population.getGdpPerCapita("MZ").subscribe(res => {
      this.last_update_gdp = res[0].lastupdated
      this.gdp_per_capita = res[1].slice(0,6)
    })
  }

  executeCommand(country: string) {
    this.getLast7YearsPopulations(country);
    this.getLast7YearsGDP(country)
  }

}
