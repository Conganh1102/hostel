import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AgmService } from '../../services/agm.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  processing;
  posts = [];
  roomImageUrl = environment.roomImageUrl;

  isShowGm = false;
  address;
  lat;
  lng;

  minPrice = 0;
  minArea = 0;

  constructor(
    private postService: PostService,
    private agmService: AgmService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  async getPosts() {
    try {
      const res = await this.postService.getPosts();
      this.posts = res.data;
      console.log(this.posts);
    } catch (error) {
      alert(error);
    }
  }

  showGoogleMap() {
    this.isShowGm = true;
  }
  hiddenGoogleMap() {
    this.isShowGm = false;
  }
  getPosition($event) {
    this.address = $event.address;
    this.lat = $event.lat;
    this.lng = $event.lng;

    this.getDistance();
  }

  createParameter() {
    // tslint:disable-next-line:prefer-const
    let parammeter = 'origins=' + this.lat + ',' + this.lng + '&destinations=';
    for (let i = 0; i < this.posts.length; i++) {
      // tslint:disable-next-line:prefer-const
      let post = this.posts[i];
      if (i === this.posts.length - 1) {
        parammeter += post.room_info.position.lat + ',' + post.room_info.position.lng;
      } else {
        parammeter += post.room_info.position.lat + ',' + post.room_info.position.lng + '|';
      }
    }
    return parammeter;
  }

  addDistance(elements) {
    for (let i = 0; i < elements.length; i++) {
      this.posts[i].distance = elements[i].distance;
    }
  }

  sortPost() {
    this.posts.sort(function (a, b) {
      if (a.distance.value < b.distance.value) {
        return -1;
      }
      if (a.distance.value > b.distance.value) {
        return 1;
      }
      return 0;
    });
  }

  async getDistance() {
    // tslint:disable-next-line:prefer-const
    let parammeter = this.createParameter();
    try {
      const res = await this.agmService.getDistance(parammeter);
      const elements  = res.rows[0].elements;
      this.addDistance(elements);
      this.sortPost();
    } catch (error) {
      alert('Error: ' + error);
    }
  }

}
