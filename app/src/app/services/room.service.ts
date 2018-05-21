import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class RoomService {

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

  getRoomsByHouseId(houseId) {
    return this.utilitiesService
    .getHttpPromise(this.http.get(this.domain + 'api/rooms/get-rooms-by-houseid/' + houseId)
    .map(res => res.json()));
  }
  getSingleRoom(id) {
    return this.utilitiesService
    .getHttpPromise(this.http.get(this.domain + 'api/rooms/get-single-room/' + id)
    .map(res => res.json()));
  }

  createRoom(room) {
    return this.utilitiesService
    .getHttpPromise(this.http.post(this.domain + 'api/rooms/create-room', room)
    .map(res => res.json()));
  }

  updateRoom(room) {
    this.createAuthenticationHeaders();
    return this.utilitiesService
    .getHttpPromise(this.http.put(this.domain + 'api/rooms/update-room', room, this.options)
    .map(res => res.json()));
  }

  deleteRoom(roomId) {
    this.createAuthenticationHeaders();
    return this.utilitiesService
    .getHttpPromise(this.http.delete(this.domain + 'api/rooms/delete-room/' + roomId, this.options)
    .map(res => res.json()));

  }
}
