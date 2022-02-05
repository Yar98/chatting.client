import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { StorageService } from '../services/storage.service'
import { PAGE_URLS } from '../constants/page-urls.const';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {

  jwtHelper = new JwtHelperService();

  constructor(private storageService: StorageService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.storageService.getAccessToken();
    if (!token) {
      console.log('ko co token');
      this.router.navigate([PAGE_URLS.LOGIN]);
      this.storageService.clearStorage();
      return false;
    }    
    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (isExpired) {
      console.log('token het han');
      this.router.navigate([PAGE_URLS.LOGIN]);
      this.storageService.clearStorage();
      return false;
    }
    return true;
  }

}
