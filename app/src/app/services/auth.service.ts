import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UtilitiesService } from './utilities.service';


@Injectable()
export class AuthService {

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

  // Function to store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  // Function to register
  registerUser(user) {
    return this.utilitiesService
    .getHttpPromise(this.http.post(this.domain + 'api/authentication/register', user)
    .map(res => res.json()));
  }

  // Function to check if username is taken
  checkUsername(username) {
    return this.utilitiesService
    .getHttpPromise(this.http.get(this.domain + 'api/authentication/checkUsername/' + username)
    .map(res => res.json()));
  }

  // Function to check if email is taken
  checkEmail(email) {
    return this.utilitiesService
    .getHttpPromise(this.http.get(this.domain + 'api/authentication/checkEmail/' + email)
    .map(res => res.json()));
  }

  // Function to login user
  login(user) {
    return this.utilitiesService
    .getHttpPromise(this.http.post(this.domain + 'api/authentication/login', user)
    .map(res => res.json()));
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  // Function to check if user is Admin
  async isAdmin() {
    this.createAuthenticationHeaders();
    try {
      const data = await this.utilitiesService
      .getHttpPromise(this.http.get(this.domain + 'api/authentication/checkAdmin', this.options)
      .map(res => res.json()));
      if (!(data.status === 200 && data.success)) {
        return false;
      } return true;
    } catch (error) {
     console.log('Error: ' + error);
      return false;
    }
  }

  // Function to check if user is logged in
  loggedIn() {
    this.loadToken();
    return !this.utilitiesService.isTokenExpired(this.authToken);
  }

}
