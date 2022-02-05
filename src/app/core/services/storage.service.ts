import { Injectable } from '@angular/core';
import { STORAGE_MANAGER } from '../constants/storage.const';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../interface/api-body.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  jwtHelper = new JwtHelperService();

  constructor() { }

  getAccessToken(): string {
    let token = sessionStorage.getItem(STORAGE_MANAGER.TOKEN);
    if (!token) {
      token = localStorage.getItem(STORAGE_MANAGER.TOKEN);
    }
    return token || '';
  }

  setAccessToken(accessToken: string, isRemember: boolean): void {
    if (isRemember)
      localStorage.setItem(STORAGE_MANAGER.TOKEN, accessToken);
    else
      sessionStorage.setItem(STORAGE_MANAGER.TOKEN, accessToken);
  }

  getUserInfo() : IUser {
    const token = this.getAccessToken();
    const user = this.jwtHelper.decodeToken(token);
    return {
      id: user.id,
      userName: user.userName
    };
  }

  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }

}
