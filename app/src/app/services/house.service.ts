import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class HouseService {

  // domain = ""; // Production
  domain = environment.domain;
  authToken;
  user;
  options;

  constructor(
    private http: Http,
    private utilitiesService: UtilitiesService
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem('token'); // Get token and asssign to variable to be used elsewhere
  }

  // Function to create an house
  createHouse(house) {
    this.createAuthenticationHeaders();
    return this.utilitiesService
    .getHttpPromise(this.http.post(this.domain + 'api/houses/create-house', house, this.options)
    .map(res => res.json()));
  }

  // Function to get own houses
  getOwnHouses() {
    this.createAuthenticationHeaders();
    return this.utilitiesService
    .getHttpPromise(this.http.get(this.domain + 'api/houses/get-own-houses', this.options)
    .map(res => res.json()));
  }

  // Function to detele a house by id
  deleteHouse(id) {
    return this.utilitiesService.getHttpPromise(this.http.delete(this.domain + 'api/houses/delete-house/' + id, this.options)
    .map(res => res.json()));
  }

}
