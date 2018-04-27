import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  avatarImage;
  user;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  // Function to logout user

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
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.loadProfile();
  }

}
