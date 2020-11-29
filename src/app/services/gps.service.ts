import { Injectable } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GPSService {

  location = new BehaviorSubject<{lat: number, lon: number}>({lat: 0, lon: 0});

  constructor(private readonly geolocation: GeolocationService) {
    this.geolocation.subscribe(location => {
      const {latitude, longitude} = location.coords;
      this.location.next({lat: latitude, lon: longitude});
    });
  }
}
