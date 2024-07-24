import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuardService {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isUserLoggedIn() && this.authService.getUserRole() == "ADMIN" || this.authService.getUserRole() == "SUPERUSER") {
      return true;
    }
    else{
      alert('Only ADMIN or SUPERUSER can access the Movie Details page');
      return false
    }

  }
}
