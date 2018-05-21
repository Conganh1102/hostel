import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class PostService {

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

  getPosts() {
    return this.utilitiesService.getHttpPromise(this.http.get(this.domain + 'api/posts/get-posts')
    .map(res => res.json()));
  }

  getSinglePost(id) {
    return this.utilitiesService.getHttpPromise(this.http.get(this.domain + 'api/posts/get-single-post/' + id)
    .map(res => res.json()));
  }

  getOwnPosts() {
    this.createAuthenticationHeaders();
    return this.utilitiesService.getHttpPromise(this.http.get(this.domain + 'api/posts/get-own-posts', this.options)
    .map(res => res.json()));
  }

  createPost(post) {
    this.createAuthenticationHeaders();
    return this.utilitiesService.getHttpPromise(this.http.post(this.domain + 'api/posts/create-post', post, this.options)
    .map(res => res.json()));
  }

  deletePost(id) {
    this.createAuthenticationHeaders();
    return this.utilitiesService.getHttpPromise(this.http.delete(this.domain + 'api/posts/delete-post/' + id, this.options)
    .map(res => res.json()));
  }

  putDownPost(roomId) {
    this.createAuthenticationHeaders();
    return this.utilitiesService.getHttpPromise(this.http.delete(this.domain + 'api/posts/put-down-post/' + roomId, this.options)
    .map(res => res.json()));
  }

}
