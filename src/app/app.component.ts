import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

interface WeatherProperties {
  city: string;
  country?: string;
  weatherDescription?: string;
  temp?: number;
  tempMin?: number;
  tempMax?: number;
  humidity?: number;
  icon?: string;
  error: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private baseUrl: string = 'http://api.openweathermap.org/data/2.5/weather';
  private apiKey: string = 'f42936954875d3ffe388af5f6eb2f57b';

  public query: string = '';
  public data: WeatherProperties = {
    error: false,
    city: ''
  };

  constructor(private http: HttpClient) {
  }

  public getWeather() {
    let params = new HttpParams();
    params = params.append('q', this.query);
    params = params.append('units', 'metric');
    params = params.append('appid', this.apiKey);
    this.http.get(this.baseUrl, { params: params }).subscribe((data: any) => {
      this.data.city = data.name;
      this.data.country = data.sys.country;
      this.data.weatherDescription = data.weather[0].description;
      this.data.temp = data.main.temp;
      this.data.tempMin = data.main.temp_min;
      this.data.tempMax = data.main.temp_max;
      this.data.humidity = data.main.humidity;
      this.data.icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      this.data.error = false;
    }, _e => {
      this.data.error = true;
      this.data.city = '';
    });
  }
}
