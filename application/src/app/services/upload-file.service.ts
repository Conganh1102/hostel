import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class UploadFileService {
  domain = environment.domain;
  authToken;
  user;
  options;
  fileLength;

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
        'authorization': this.authToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem('token'); // Get token and asssign to variable to be used elsewhere
  }

  uploadAvatar(file: File) {
    this.createAuthenticationHeaders();
    const formData: FormData = new FormData();
    formData.append('avatar', file);
    return this.utilitiesService
    .getHttpPromise(this.http.post(this.domain + 'api/users/upload-avatar', formData, this.options)
    .map(res => res.json()));
  }

}
