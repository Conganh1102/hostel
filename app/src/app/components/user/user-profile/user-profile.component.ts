import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { UploadFileService } from '../../../services/upload-file.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form;
  user;
  avatarImage;
  onMouseAvatar;
  processingUploadImage;
  processingUploadAvatar = false;
  selectedFile: File = null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uploadFileService: UploadFileService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.loadProfile();
    this.processingUploadImage = environment.commonImage + 'processing.png';
  }

  async loadProfile() {
    if (this.authService.loggedIn()) {
      try {
        const res = await this.userService.getProfile();
        this.user = res.data.user;
        this.avatarImage = environment.avatarUrl + this.user.info.avatar;
      } catch (error) {
        alert('Đã có lỗi xảy ra: ' + error);
      }
    }
  }
  mouseOverAvatar($event) {
    this.onMouseAvatar = true;
  }
  mouseLeaveAvatar($event) {
    this.onMouseAvatar = false;
  }

  async onUploadAvatar() {
    this.processingUploadAvatar = true;
    try {
      const res = await this.uploadFileService.uploadAvatar(this.selectedFile);
      this.processingUploadAvatar = false;
    } catch (error) {
      alert('Đã có lỗi xảy ra: ' + error);
      this.processingUploadAvatar = false;
    }

  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.avatarImage = e.target.result;
      this.onUploadAvatar();
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
