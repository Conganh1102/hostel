import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UtilitiesService } from './utilities.service';
import { environment } from '../../environments/environment';

import {} from '@types/googlemaps';

@Injectable()
export class AgmService {

  constructor(
    private http: Http,
    private utilitiesService: UtilitiesService
  ) { }

  //
  getGeocoding(parameters) {
    console.log('https://maps.googleapis.com/maps/api/geocode/json?address='
    + parameters + '&key=' + environment.agmApiKey);
    return this.utilitiesService
    .getHttpPromise(this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
    + parameters + '&key=' + environment.agmApiKey)
    .map(res => res.json()));
  }

  getDistance(parameters) {
    console.log('https://maps.googleapis.com/maps/api/distancematrix/json?'
    + parameters + '&key=' + environment.agmApiKey);
    return this.utilitiesService
    .getHttpPromise(this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?'
    + parameters + '&key=' + environment.agmApiKey)
    .map(res => res.json()));
  }

}
