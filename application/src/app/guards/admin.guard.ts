import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  redirectUrl;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  async canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Check if user is logge din
    if (await this.authService.isAdmin()) {
      return true; // Return true: User is allowed to view route
    } else {
      this.redirectUrl = state.url; // Grab previous urul
      this.authService.logout();
      this.router.navigate(['/login']); // Return error and route to login page
      return false; // Return false: user not authorized to view page
    }
  }
}
