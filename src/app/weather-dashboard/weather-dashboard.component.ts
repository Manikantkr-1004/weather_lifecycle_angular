import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent {
  
  data: any = [];
  lat: number | null = null;
  lon: number | null = null;
  location: string | null = null;

  constructor(private weatherService: WeatherService){};

  ngOnInit(){

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;

          this.weatherService.getWeatherData(undefined,this.lat,this.lon).subscribe((data)=>{
            this.data = data;
            console.log(data);
            
          },(error)=>{
            alert(error.error.message);
          })
          
        },
        (error) => {
          alert("To see Weather Updates, Please Allow location permission and Refresh the page.")
        }
      );
    } else {
      alert("Geolocation is not available in this browser.");
    }

    
  }

  getTemp(): string{
    let str= "";
    const celcius = Math.floor(this.data?.main?.temp - 273.15);
    const Far = Math.floor(this.data?.main?.temp - 273.15) * 9/5 + 32;
    str+= `${celcius}°C - ${Far}°F - ${this.data?.main?.temp}°K`

    return str;
  }

  setLocation(event: Event){
    this.location = (event.target as HTMLInputElement).value;
  }

  onClick(){
    if(this.location){
      this.weatherService.getWeatherData(this.location,undefined,undefined).subscribe((data)=>{
        this.data = data;
        console.log(data);
        
      },(error)=>{
        alert(error.error.message);
      })
    }else{
    alert("Please write City name in Input Box.")
    }

  }

  checkSunrise(time: number,timezone:number){
    return new Date((time + timezone) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  }

  checkSunset(time: number,timezone:number){
    return new Date((time + timezone) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }

}