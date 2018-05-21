import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { RoomService } from '../../../../services/room.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-post-manager',
  templateUrl: './post-manager.component.html',
  styleUrls: ['./post-manager.component.css']
})
export class PostManagerComponent implements OnInit {

  posts;
  roomImageUrl = environment.roomImageUrl;
  selectedPost;

  constructor(
    private postService: PostService,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.getOwnPosts();
  }

  async getOwnPosts() {
    try {
      const res = await this.postService.getOwnPosts();
      this.posts = res.data;
    } catch (error) {
      alert('Error: ' + error);
    }
  }

  selectPost(post) {
    this.selectedPost = post;
  }

  async deletePost() {
    try {
    const res = await this.postService.deletePost(this.selectedPost._id);
    if (this.selectedPost.roomId) {
      // tslint:disable-next-line:prefer-const
      let newRoom = {
        _id: this.selectedPost.roomId,
        status: 'EMPTY'
      };
      const res2 = await this.roomService.updateRoom(newRoom);
    }
    setTimeout(function() {
      window.location.reload();
    }, 1000);
    } catch (error) {
      alert(error);
    }
  }

}
