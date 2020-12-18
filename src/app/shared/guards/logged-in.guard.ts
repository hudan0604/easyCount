import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment,
    UrlTree
} from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private userservice: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userservice.isUserLoggedIn() || this.router.parseUrl('/login');
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userservice.isUserLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
