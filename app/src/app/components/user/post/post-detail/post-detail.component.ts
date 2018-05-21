import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../../services/post.service';
import { RoomService } from '../../../../services/room.service';
import { UserService } from '../../../../services/user.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post;
  poster;
  currentUrl;
  imageUrl = environment.roomImageUrl;
  room;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve blog
    this.getPostDetail();
  }

  async getPostDetail() {
    try {
      const postResponse = await this.postService.getSinglePost(this.currentUrl.id);
      this.post = postResponse.data;
      const posterResponse = await this.userService.getPublicProfile(this.post.poster);
      this.poster = posterResponse.data.user;
      if (this.post.roomId) {
        const roomRes = await this.roomService.getSingleRoom(this.post.roomId);
        // console.log(roomRes);
        this.room = roomRes.room;
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  }

}
