import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Function to determine whether user is authorized to view route
  async canActivate() {
    // Check if user is logged in
    if (await this.authService.loggedIn()) {
      this.router.navigate(['/']); // Return error, route to home
      return false; // Return false: user not allowed to view route
    } else {
      return true; // Return true: user is allowed to view route
    }
  }
}
