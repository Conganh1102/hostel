import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../../services/post.service';
import { UploadFileService } from '../../../../services/upload-file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  currentUrl;

  message;
  messageClass;
  form;
  selectedFile;

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
    private uploadFileService: UploadFileService,
  ) { }

  ngOnInit() {
    this.createForm();
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
      title: this.form.get('title').value,
      address: this.form.get('address').value,
      lat: this.lat,
      lng: this.lng,
      floor: this.form.get('floor').value,
      area: this.form.get('area').value,
      price: this.form.get('price').value,
      images: this.form.get('images').value,
      other_info: this.form.get('other_info').value,
      owner: this.form.get('owner').value,
      phone: this.form.get('phone').value,

    };
    try {
      const resUploadImage = await this.uploadFileService.uploadRoomImage(this.selectedFile);
      post.images = resUploadImage.filename;
      const res = await this.postService.createPost(post);
      // this.processing = false;
      // this.enableFormNewHouse();
      this.messageClass = 'alert alert-success'; // Set a success class
      this.message = res.message; // Set a success message
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
