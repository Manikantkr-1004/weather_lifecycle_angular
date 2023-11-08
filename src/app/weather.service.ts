import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(location?:string,lat?:number,lon?:number){
    if(lat && lon){
      return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3df3cea1ecef9f83f9d6a6cbe1f575b6`);
    }else{
      return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3df3cea1ecef9f83f9d6a6cbe1f575b6`)
    }
  }
}
