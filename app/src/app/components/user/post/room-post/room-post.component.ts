import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../../services/post.service';
import { UploadFileService } from '../../../../services/upload-file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../services/room.service';
import { UserService } from '../../../../services/user.service';
import { HouseService } from '../../../../services/house.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-room-post',
  templateUrl: './room-post.component.html',
  styleUrls: ['./room-post.component.css']
})
export class RoomPostComponent implements OnInit {

  currentUrl;

  message;
  messageClass;
  form;
  selectedFile;

  room;
  user;
  house;

  address;
  lat = 2321.123;
  lng = 23123.213;

  processing = false;
  isShowGm = false;

  roomImage;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uploadFileService: UploadFileService,
    private roomService: RoomService,
    private userService: UserService,
    private houseService: HouseService
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    this.createForm();
    this.getInfo();
  }

  async getInfo() {
    try {
      const roomRes = await this.roomService.getSingleRoom(this.currentUrl.id);
      const userRes = await this.userService.getProfile();
      this.room = roomRes.room;
      this.user = userRes.data.user;
      this.roomImage = environment.roomImageUrl + this.room.images;
      const houseRes = await this.houseService.getSingleHouse(this.room.houseId);
      this.house = houseRes.house;
      this.address = houseRes.house.address;
    } catch (error) {
      alert(error);
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      floor: ['', Validators.compose([Validators.required])],
      owner: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      area: ['', Validators.compose([Validators.required])],
      images: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      other_info: ['', Validators.compose([Validators.required])]
    });

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
  }
  enableForm() {
    this.form.controls['title'].enable();
    this.form.controls['address'].enable();
    this.form.controls['floor'].enable();
    this.form.controls['area'].enable();
    this.form.controls['price'].enable();
    this.form.controls['images'].enable();
    this.form.controls['other_info'].enable();
  }
  disableForm() {
    this.form.controls['title'].enable();
    this.form.controls['address'].disable();
    this.form.controls['floor'].disable();
    this.form.controls['area'].disable();
    this.form.controls['price'].disable();
    this.form.controls['images'].disable();
    this.form.controls['other_info'].disable();

  }
  async onSubmit() {
    this.processing = true;
    this.disableForm();
    const post = {
      roomId: this.room._id,
      title: this.form.get('title').value,
      address: this.form.get('address').value,
      lat: this.house.position.lat,
      lng: this.house.position.lng,
      floor: this.form.get('floor').value,
      area: this.form.get('area').value,
      price: this.form.get('price').value,
      images: this.room.images,
      other_info: this.form.get('other_info').value,
      owner: this.form.get('owner').value,
      phone: this.form.get('phone').value,

    };

    try {
      // const resUploadImage = await this.uploadFileService.uploadRoomImage(this.selectedFile);
      // post.images = resUploadImage.filename;
      const res1 = await this.postService.createPost(post);
      // tslint:disable-next-line:prefer-const
      let newRoom = {
        _id: this.room._id,
        status: 'SALE'
      };
      const res2 = await this.roomService.updateRoom(newRoom);
      // this.processing = false;
      // this.enableFormNewHouse();
      this.messageClass = 'alert alert-success'; // Set a success class
      this.message = res1.message; // Set a success message
      setTimeout(() => {
        this.router.navigate(['/home']); // Redirect to login view
      }, 1000);
    } catch (error) {
      this.processing = false;
      this.enableForm();
      this.messageClass = 'alert alert-danger';
      this.message = 'Đăng bài không thành công';
      console.log(error);
    }
  }


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.roomImage = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
